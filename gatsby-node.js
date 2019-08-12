"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trustpilot_helpers_1 = require("./trustpilot-helpers");
function validateConfigOptions(configOptions) {
    if (!Object.prototype.hasOwnProperty.call(configOptions, 'apiKey') || !configOptions.apiKey) {
        throw new Error('apiKey config option is required');
    }
    if (!Object.prototype.hasOwnProperty.call(configOptions, 'domainName') || !configOptions.domainName) {
        throw new Error('domainName config option is required');
    }
}
function sourceNodes(sourceNodesArgs, configOptions) {
    validateConfigOptions(configOptions);
    return Promise.all([createPublicBusinessUnitInfoNode(sourceNodesArgs, configOptions)]);
}
exports.sourceNodes = sourceNodes;
function createPublicBusinessUnitInfoNode(sourceNodesArgs, configOptions) {
    var actions = sourceNodesArgs.actions, createNodeId = sourceNodesArgs.createNodeId, createContentDigest = sourceNodesArgs.createContentDigest;
    var createNode = actions.createNode;
    return trustpilot_helpers_1.getPublicBusinessUnitInfo(configOptions).then(function (info) {
        var nodeContent = JSON.stringify(info);
        var nodeMeta = {
            // the cat fact unique id is in _id
            id: createNodeId("trustpilot-public-business-unit-" + configOptions.domainName),
            parent: null,
            children: [],
            internal: {
                // this will be important in finding the node
                type: "TrustPilotPublicBusinessUnit",
                content: nodeContent,
                contentDigest: createContentDigest(info)
            }
        };
        var node = Object.assign({}, info, nodeMeta);
        createNode(node);
    });
}
//# sourceMappingURL=gatsby-node.js.map