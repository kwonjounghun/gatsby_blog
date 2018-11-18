module.exports = {
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: "markdown-pages"
      }
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/study`,
          name: "markdown-pages"
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/_posts`,
          name: "markdown-pages"
        }
      },
    `gatsby-transformer-remark`
  ]
};
