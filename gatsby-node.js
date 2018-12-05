const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);
  const blogListPageTemplate = path.resolve(
    `src/templates/blogListTemplate.js`
  );
  const blogRootListPageTemplate = path.resolve(`src/templates/blogRootListTemplate.js`);

  const createListPageFn = async (NavMenu, result, category) => {
    let component = category ? blogListPageTemplate : blogRootListPageTemplate;
    const postLimit = 10;
    let current = 1;
    if(!result.data.allMarkdownRemark) return;
    const edge = result.data.allMarkdownRemark.edges;
    const totalPost = edge.length;
    const totalPage = Math.ceil(totalPost / postLimit);
    for (let i = 0; i < totalPage; i++) {
      let path = `/${i}`;
      if (i === 0 && category == null) {
        path = `/`;
      } else if (category == null) {
        path = `/${i + 1}`;
      } else if (category) {
        path = `/${category}/${i + 1}`;
      }
      createPage({
        path: path,
        component,
        context: {
          NavMenu,
          postLimit: postLimit,
          skip: i * postLimit,
          totalPage,
          current: current,
          category
        } // additional data can be passed via context
      });
      current++;
    }
  };

  const createListPage = async NavMenu => {
    return graphql(`
      {
        allMarkdownRemark(filter: {frontmatter: { Public: { eq: true }}}, sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              excerpt
              frontmatter {
                path
                category
                label
                title
                thumbnail
                date
              }
            }
          }
        }
      }
    `).then(async result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }
      createListPageFn(NavMenu, result);
    });
  };

  const createCategoryListPage = async (NavMenu, category) => {
    return graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { category : { eq : "${category}" }, Public: { eq: true }}}
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
    `).then(async result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }
      await createListPageFn(NavMenu, result, category);
    });
  };

  const createCategoryListPageFn = async (NavMenu, category) => {
    return category.forEach(async item => {
      createCategoryListPage(NavMenu, item);
    });
  };

  const getCategory = async _ => {
    return graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {frontmatter: { Public: { eq: true }}}
          ) {
          edges {
            node {
              frontmatter {
                category
              }
            }
          }
        }
      }
    `).then(async result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }
      return DuplicateInspection(
        result.data.allMarkdownRemark.edges,
        "category"
      );
    });
  };

  const DuplicateInspection = (array, target) => {
    return array.reduce((acc, current) => {
      if (acc.indexOf(current.node.frontmatter[target]) < 0) {
        acc.push(current.node.frontmatter[target]);
      }
      return acc;
    }, []);
  };

  const createPostPage = async NavMenu => {
    return graphql(`
      {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
          context: {
            NavMenu
          } // additional data can be passed via context
        });
      });
    });
  };

  const getNavMenu = async _ => {
    return graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {frontmatter: { Public: { eq: true }}}
          ) {
          edges {
            node {
              frontmatter {
                label
                category
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }
      return result.data.allMarkdownRemark.edges;
    });
  };
  const createNavMenu = async array => {
    let menu = [];
    let labels = await DuplicateInspection(array, "label");
    // array는 menu key는 category, label
    let isKey = async (array, key) => {
      let result = false;
      if(array.length === 0) return result;
      for(let [index, item] of array.entries()){
        if(item.key === key) return result = {index};
        await setTimeout(()=>{}, 100);
      }
      return result;
    };

    // array는 array, menu는 menu
    let addMenuItem = async (array, menu, isKey) => {
      for(let item of array){
        let {label, category} = item.node.frontmatter;
        let isIndex = await isKey(menu, label);
        if(isIndex) {
          // key가 이미 존재할 경우
          let isCateIndex = await isKey(menu[isIndex.index].list, category);
          if (isCateIndex) {
            menu[isIndex.index].list[isCateIndex.index].count += 1;
          } else {
            menu[isIndex.index].list.push({key: category, count: 1});
          }
        } else {
          menu.push({key: label, list: [{key: category, count: 1}]});
        }
      }
    }

    await addMenuItem(array, menu, isKey);
    return menu;
  };
  let categorys = await getCategory();
  let menus = await getNavMenu();
  let NavMenu = await createNavMenu(menus);
  await createListPage(NavMenu);
  await createCategoryListPageFn(NavMenu, categorys);
  await createPostPage(NavMenu);
};
