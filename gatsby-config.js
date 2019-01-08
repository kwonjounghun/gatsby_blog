module.exports = {
  siteMetadata: {
    title: "내 블로그"
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/_posts`,
          name: "markdown-pages"
        }
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          "excerpt_separator": `<!-- end -->`
        }
      },
      {
        resolve: 'gatsby-plugin-google-fonts',
        options: {
          fonts: [
            'material icons',
            'roboto:300,400,500,700',
          ],
        },
      },
    "gatsby-plugin-styled-components",
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-131939758-1",
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "zenlog.netlify.com",
      },
    }
  ]
};
