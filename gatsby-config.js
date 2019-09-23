module.exports = {
  siteMetadata: {
    title: `Friends of Kerouac`,
    description: `Learn about the people who made up the Beat Generation in Kerouac's The Duluoz Legend.`,
    author: `@jthawme`,
    keywords: ['Beat Generation', 'Beatnik', 'Jack Kerouac', 'Kerouac', 'On the Road', 'Dean Moriarty', 'Neal Cassady', 'Allen Ginsberg'],
    image: 'https://friendsofkerouac.com/images/social.png'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Friends of Kerouac`,
        short_name: `Kerouac`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
          component: require.resolve(`./src/components/Common/Layout/Layout`)
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-69179600-2",
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
}
