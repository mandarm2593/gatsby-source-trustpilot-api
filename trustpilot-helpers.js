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
// https://developers.trustpilot.com/business-units-api#get-a-business-unit's-reviews
function getBusinessUnitsReviews(configOptions) {
    var apiKey = configOptions.apiKey, domainName = configOptions.domainName;
    return retrieveBusinessUnitId(apiKey, domainName)
        .then(function (businessUnitId) {
        return axios_1.default.get(TRUSTPILOT_API_URL + "/business-units/" + businessUnitId + "/reviews?apikey=" + apiKey)
            .then(function (response) {
            return processBusinessUnitReviews(response.data);
        }).catch(function (error) {
            throw new Error("Failed To retrieve Business Unit Reviews from TrustPilot " + error);
        });
    });
}
exports.getBusinessUnitsReviews = getBusinessUnitsReviews;
function processPublicBusinessUnitInfo(publicBusinessUnitInfo) {
    delete publicBusinessUnitInfo.links;
    delete publicBusinessUnitInfo.name;
    delete publicBusinessUnitInfo.status;
    delete publicBusinessUnitInfo.score;
    publicBusinessUnitInfo.businessUnitId = publicBusinessUnitInfo.id;
    delete publicBusinessUnitInfo.warning;
    delete publicBusinessUnitInfo.id;
    return publicBusinessUnitInfo;
}
function processBusinessUnitReviews(businessUnitReviews) {
    delete businessUnitReviews.links;
    delete businessUnitReviews.id;
    delete businessUnitReviews.businessUnit;
    delete businessUnitReviews.location;
    delete businessUnitReviews.language;
    delete businessUnitReviews.updatedAt;
    delete businessUnitReviews.companyReply;
    delete businessUnitReviews.isVerified;
    delete businessUnitReviews.numberOfLikes;
    delete businessUnitReviews.status;
    delete businessUnitReviews.reportData;
    delete businessUnitReviews.complianceLabels;
    delete businessUnitReviews.countsTowardsTrustScore;
    delete businessUnitReviews.countsTowardsLocationTrustScore;
    delete businessUnitReviews.invitation;
    return businessUnitReviews;
}
//# sourceMappingURL=trustpilot-helpers.js.map