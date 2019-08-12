import { getPublicBusinessUnitInfo } from './trustpilot-helpers'

export interface SourceNodesArgs {
    actions: {[key: string]: any}
    createNodeId: Function
    createContentDigest: Function
}

export interface ConfigOptions {
    apiKey: string
    domainName: string
}

function validateConfigOptions (configOptions: ConfigOptions): void {
  if (!Object.prototype.hasOwnProperty.call(configOptions, 'apiKey') || !configOptions.apiKey) {
    throw new Error('apiKey config option is required')
  }

  if (!Object.prototype.hasOwnProperty.call(configOptions, 'domainName') || !configOptions.domainName) {
    throw new Error('domainName config option is required')
  }
}

export function sourceNodes (sourceNodesArgs: SourceNodesArgs, configOptions: ConfigOptions): Promise<void[]> {
  validateConfigOptions(configOptions)

  return Promise.all([createPublicBusinessUnitInfoNode(sourceNodesArgs, configOptions)])
}

function createPublicBusinessUnitInfoNode (sourceNodesArgs: SourceNodesArgs, configOptions: ConfigOptions): Promise<void> {
  const { actions, createNodeId, createContentDigest } = sourceNodesArgs
  const { createNode } = actions
  return getPublicBusinessUnitInfo(configOptions).then((publicBusinessUnitInfo: any): void => {
    const nodeContent = JSON.stringify(publicBusinessUnitInfo)
    const nodeMeta = {
      id: createNodeId(`trustpilot-public-business-unit-${configOptions.domainName}`),
      parent: null,
      children: [],
      internal: {
        type: `TrustPilotPublicBusinessUnit`,
        content: nodeContent,
        contentDigest: createContentDigest(publicBusinessUnitInfo)
      }
    }
    const node = Object.assign({}, publicBusinessUnitInfo, nodeMeta)
    createNode(node)
  })
}
