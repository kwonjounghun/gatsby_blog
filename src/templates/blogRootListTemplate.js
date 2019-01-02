import React from "react";
import { graphql } from "gatsby";
import ListPageContent from "../components/ListPageContent";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pathContext
}) {
  const { allMarkdownRemark, site } = data; // data.markdownRemark holds our post data
  const { siteMetadata } = site;
  const { edges } = allMarkdownRemark;
  return <ListPageContent edges={edges} pathContext={pathContext} siteMetadata={siteMetadata} />;
}

export const pageQuery = graphql`
  query($skip: Int!, $postLimit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $postLimit
      skip: $skip
      filter: {frontmatter: { Public: { eq: true }}}
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          frontmatter {
            path
            category
            label
            title
            thumbnail
            title
            date(formatString: "YYYY-MM-DD")
            category
          }
        }
      }
    }
  }
`;
