import axios, { AxiosError, AxiosResponse } from 'axios'
import { ConfigOptions } from './gatsby-node'

const TRUSTPILOT_API_URL = 'https://api.trustpilot.com/v1'

function retrieveBusinessUnitId (apiKey: string, domainName: string): Promise<string> {
  return axios.get(`${TRUSTPILOT_API_URL}/business-units/find?apikey=${apiKey}&name=${domainName}`)
    .then((response: AxiosResponse): string => {
      return response.data.id
    }).catch((error: AxiosError): never => {
      throw new Error(`Failed To retrieve Business Unit ID from TrustPilot ${error}`)
    })
}
// https://developers.trustpilot.com/business-units-api#get-public-business-unit
export function getPublicBusinessUnitInfo (configOptions: ConfigOptions): Promise<PublicBusinessUnitInfo> {
  const { apiKey, domainName } = configOptions

  return retrieveBusinessUnitId(apiKey, domainName)
    .then((businessUnitId: string): Promise<PublicBusinessUnitInfo> => {
      return axios.get(`${TRUSTPILOT_API_URL}/business-units/${businessUnitId}?apikey=${apiKey}`)
        .then((response: AxiosResponse): PublicBusinessUnitInfo => {
          return processPublicBusinessUnitInfo(response.data)
        }).catch((error: AxiosError): never => {
          throw new Error(`Failed To retrieve Public Business Unit Info from TrustPilot ${error}`)
        })
    })
}

interface PublicBusinessUnitInfo {
    id: string
    displayName: string
    websiteUrl: string
    trustScore: number
    stars: number
    country: string
    numberOfReviews: {
        total: number
        usedForTrustScoreCalculation: number
        oneStar: number
        twoStars: number
        threeStars: number
        fourStars: number
        fiveStars: number
    }
}

function processPublicBusinessUnitInfo (publicBusinessUnitInfo: {[key: string]: any}): any {
  delete publicBusinessUnitInfo.links
  delete publicBusinessUnitInfo.name
  delete publicBusinessUnitInfo.status
  delete publicBusinessUnitInfo.score
  return publicBusinessUnitInfo
}
