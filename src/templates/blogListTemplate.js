import React from "react";
import { graphql } from "gatsby";
import ContentList from "../components/ContentList";
import Layout from "../layout";

export default function Template({
  data // this prop will be injected by the GraphQL query below.
}) {
  console.log(data);
  const { allMarkdownRemark } = data; // data.markdownRemark holds our post data
  const { edges } = allMarkdownRemark;
  return (
    <Layout>
      <ContentList list={edges} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($skip: Int!, $postLimit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $postLimit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
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
