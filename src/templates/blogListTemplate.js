import React from "react";
import { graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import ContentList from "../components/ContentList";
import Layout from "../layout";
import Pagenation from "../components/Pagenation";
import PxtoRem from "../modules/PxtoRem";
import themes from "../styled-components/themes";

const Box = styled.div`
  /* margin-top: ${PxtoRem(25)}; */
  padding-top: ${PxtoRem(80)};
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  position: relative;
  top: 0;
  ${props => props.theme.Media.xlarge`position: relative; top: ${PxtoRem(20)}; padding-top: 0; padding-left: ${PxtoRem(300)}; box-sizing: content-box; height: 95vh;`}
  ${props => props.theme.Media.large`position: relative; top: ${PxtoRem(20)}; padding-top: 0; padding-left: ${PxtoRem(300)}; box-sizing: content-box; height: 95vh;`}
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  padding-right: 1rem;
`

const Content = styled.div`
  ${props => props.theme.Media.xlarge`width: ${PxtoRem(800)};`}
  ${props => props.theme.Media.large`width: ${PxtoRem(800)};`}
`

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
        <Box>
          <Wrap>
            <Content>
              <ContentList list={edges} />
              { totalPage > 0 && <Pagenation
                current={current}
                postLimit={postLimit}
                skip={skip}
                totalPage={totalPage}
                category={category}
              />}
            </Content>
          </Wrap>
        </Box>
      </ThemeProvider>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($skip: Int!, $postLimit: Int!, $category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: { category: { eq: $category }, Public: { eq: true }}}
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
