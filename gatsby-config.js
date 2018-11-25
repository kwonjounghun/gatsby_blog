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
    `gatsby-plugin-react-helmet`
  ]
};
