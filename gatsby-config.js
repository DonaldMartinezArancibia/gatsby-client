require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Home`,
    titleTemplate: `%s | Cody Blog`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ligula tempus ligula hendrerit elementum. In semper, erat ut tristique tincidunt, purus tortor egestas augue, ut condimentum lectus neque quis enim. In feugiat eget lorem sit amet congue. Fusce porta accumsan maximus. Praesent et urna eget est accumsan tempus. Mauris a ligula a sapien sodales dapibus at at lectus. Proin ac erat leo. Etiam hendrerit ut lacus vitae maximus. Quisque luctus luctus mi sit amet tincidunt. Donec feugiat ut massa vitae aliquet. Ut ut tempus magna. Ut vulputate massa tempus neque porttitor vestibulum. Etiam eget risus tempus purus eleifend aliquet. Cras faucibus porta augue, eget viverra neque laoreet quis. Nullam vel pulvinar nunc. Nulla mauris risus, fringilla a lacus quis, convallis feugiat purus.`,
    author: `@codigofacilito`,
    siteUrl: `https://codyblog.com`,
    image: `/src/images/og.jpg`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve:"gatsby-source-graphcms",
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
      }
    },
    'gatsby-plugin-postcss',
  ],
}
