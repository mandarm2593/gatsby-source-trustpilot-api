"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var TRUSTPILOT_API_URL = 'https://api.trustpilot.com/v1';
function retrieveBusinessUnitId(apiKey, domainName) {
    return axios_1.default.get(TRUSTPILOT_API_URL + "/business-units/find?apikey=" + apiKey + "&name=" + domainName)
        .then(function (response) {
        return response.data.id;
    }).catch(function (error) {
        throw new Error("Failed To retrieve Business Unit ID from TrustPilot " + error);
    });
}
// https://developers.trustpilot.com/business-units-api#get-public-business-unit
function getPublicBusinessUnitInfo(configOptions) {
    var apiKey = configOptions.apiKey, domainName = configOptions.domainName;
    return retrieveBusinessUnitId(apiKey, domainName)
        .then(function (businessUnitId) {
        return axios_1.default.get(TRUSTPILOT_API_URL + "/business-units/" + businessUnitId + "?apikey=" + apiKey)
            .then(function (response) {
            return processPublicBusinessUnitInfo(response.data);
        }).catch(function (error) {
            throw new Error("Failed To retrieve Public Business Unit Info from TrustPilot " + error);
        });
    });
}
exports.getPublicBusinessUnitInfo = getPublicBusinessUnitInfo;
function processPublicBusinessUnitInfo(publicBusinessUnitInfo) {
    delete publicBusinessUnitInfo.links;
    delete publicBusinessUnitInfo.name;
    delete publicBusinessUnitInfo.status;
    delete publicBusinessUnitInfo.score;
    publicBusinessUnitInfo.businessUnitId = publicBusinessUnitInfo.id;
    delete publicBusinessUnitInfo.id;
    return publicBusinessUnitInfo;
}
//# sourceMappingURL=trustpilot-helpers.js.map