import { getPublicBusinessUnitInfo, getBusinessUnitsReviews } from './trustpilot-helpers'

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

  return Promise.all([createPublicBusinessUnitInfoNode(sourceNodesArgs, configOptions),
    createPublicBusinessUnitReview(sourceNodesArgs, configOptions)])
}

async function createPublicBusinessUnitInfoNode (sourceNodesArgs: SourceNodesArgs, configOptions: ConfigOptions): Promise<void> {
  const { actions, createNodeId, createContentDigest } = sourceNodesArgs
  const { createNode } = actions
  const publicBusinessUnitInfo = await getPublicBusinessUnitInfo(configOptions)
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
}

async function createPublicBusinessUnitReview (sourceNodesArgs: SourceNodesArgs, configOptions: ConfigOptions): Promise<void> {
  const { actions, createNodeId, createContentDigest } = sourceNodesArgs
  const { createNode } = actions
  const BusinessUnitReviews = await getBusinessUnitsReviews(configOptions)
  const nodeContent = JSON.stringify(BusinessUnitReviews)
  const nodeMeta = {
    id: createNodeId(`trustpilot-public-business-unit-${configOptions.domainName}`),
    parent: null,
    children: [],
    internal: {
      type: `TrustPilotBusinessUnitReviews`,
      content: nodeContent,
      contentDigest: createContentDigest(BusinessUnitReviews)
    }
  }
  const node = Object.assign({}, BusinessUnitReviews, nodeMeta)
  createNode(node)
}
