const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);
  const blogListPageTemplate = path.resolve(
    `src/templates/blogListTemplate.js`
  );

  const createListPage = async _ => {
    return graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              excerpt
              frontmatter {
                path,
                category,
                label,
                title,
                thumbnail,
                date
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      result.data.allMarkdownRemark.edges.forEach(({ node }, index) => {
        let path = `/${index}`;
        if(index === 0){
          path = "/"
        }
        createPage({
          path: path,
          component: blogListPageTemplate,
          context: {
            postLimit: 2,
            skip: index*2
          } // additional data can be passed via context
        });
      });
    });
  };

  const createPostPage = async _ => {
    return graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {} // additional data can be passed via context
        });
      });
    });
  };

  await createListPage();
  await createPostPage();
};
