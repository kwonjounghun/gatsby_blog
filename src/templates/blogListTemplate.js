import React from "react";
import { graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import ContentList from "../components/ContentList";
import Layout from "../layout";
import Pagenation from "../components/Pagenation";
import PxtoRem from "../modules/PxtoRem";
import themes from "../styled-components/themes";

const Content = styled.div`
  margin-top: ${PxtoRem(25)};
  width: 100%;
  ${props => props.theme.Media.xlarge`width: ${PxtoRem(800)};`}
  ${props => props.theme.Media.large`width: ${PxtoRem(800)};`}
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pathContext
}) {
  const { allMarkdownRemark } = data; // data.markdownRemark holds our post data
  const { edges } = allMarkdownRemark;
  const { current, postLimit, skip, totalPage, category, NavMenu } = pathContext;
  return (
    <Layout site={data.site.siteMetadata} NavMenu={NavMenu}>
      <ThemeProvider theme={themes}>
        <Content>
          <ContentList list={edges} />
          <Pagenation
            current={current}
            postLimit={postLimit}
            skip={skip}
            totalPage={totalPage}
            category={category}
          />
        </Content>
      </ThemeProvider>
    </Layout>
  );
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
