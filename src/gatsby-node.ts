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

export function sourceNodes ({ actions, createNodeId, createContentDigest }: SourceNodesArgs, configOptions: ConfigOptions): Promise<void> {
  const { createNode } = actions

  validateConfigOptions(configOptions)

  return getPublicBusinessUnitInfo(configOptions).then((info: any): void => {
    const nodeContent = JSON.stringify(info)
    const nodeMeta = {
      // the cat fact unique id is in _id
      id: createNodeId(`trustpilot-public-business-unit-${configOptions.domainName}`),
      parent: null,
      children: [],
      internal: {
        // this will be important in finding the node
        type: `TrustPilotPublicBusinessUnit`,
        content: nodeContent,
        contentDigest: createContentDigest(info)
      }
    }
    const node = Object.assign({}, info, nodeMeta)
    createNode(node)
  })
}
