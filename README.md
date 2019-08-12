[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Description

Creates Trustpilot api integration for your gatsby website. This source plugin fetches data from Trustpilot API and 
makes it available through GraphQL nodes. The generated Query nodes can be viewed using gatsby's GraphiQL
editor. This plugin just fetches the [public business unit information](https://developers.trustpilot.com/business-units-api#get-public-business-unit) from Trustpilot.
More features will be added in further releases.

## How to integrate it with Gatsby?
1. install the plugin `npm install gatsby-source-trustpilot-api`
2. configure the plugin in your `gatsby-config.js` file
 ```
    module.exports = {
      siteMetadata: {
          title: 'Title of your website'
      },
      plugins: [
          {
              resolve: 'gatsby-source-trustpilot-api',
              options: {
                  apiKey: 'YOUR_TRUSTPILOT_API_KEY',
                  domainName: 'YOUR_DOMAIN_NAME'
              }
          }
      ]
    };
```

## Config Options
The plugin takes two REQUIRED config options,
1. `apiKey` : This is your Trustpilot API key. If you dont have one yet, here is a link - [Get Started - Trustpilot API](https://support.trustpilot.com/hc/en-us/articles/207309867-Getting-started-with-Trustpilot-s-APIs)
2. `domainName`: This is the domain name that you want to fetch TrustPilot Data for. 

## How to query for data?
If all goes well, you should be able to access nodes created by the plugin in your site's GraphiQL editor.
For example: 
```
{
  trustPilotPublicBusinessUnit {
    id
    displayName
    trustScore
    stars
    country
    numberOfReviews {
      total
      oneStar
      twoStars
      threeStars
      fourStars
      fiveStars
    }
  }
}
```
