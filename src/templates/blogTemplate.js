import React from "react";
import { graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import Layout from "../layout";
import PxtoRem from "../modules/PxtoRem";
import themes from "../styled-components/themes";
import Helmet from "react-helmet";


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
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  const { NavMenu } = pathContext;
  return (
    <Layout site={data.site.siteMetadata} NavMenu={NavMenu}>
      <ThemeProvider theme={themes}>
        <Content>
          <Helmet>
            <link src="/static/assets/style/markdown.css"/>
          </Helmet>
          <div className="blog-post-container">
            <div className="blog-post">
              <h1>{frontmatter.title}</h1>
              <h2>{frontmatter.date}</h2>
              <div
                className="blog-post-content markdown-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </Content>
      </ThemeProvider>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
