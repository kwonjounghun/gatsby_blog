import React from "react";
import { graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import Layout from "../layout";
import OtherPost from "../components/OtherPost";
import PxtoRem from "../modules/PxtoRem";
import themes from "../styled-components/themes";
import Helmet from "react-helmet";
import MarkDownStyle from "../../static/assets/style/markdown.css";


const Content = styled.div`
  margin-top: ${PxtoRem(25)};
  width: 100%;
  ${props => props.theme.Media.xlarge`width: ${PxtoRem(800)};`}
  ${props => props.theme.Media.large`width: ${PxtoRem(800)};`}
`;

const BlogPost = styled.div`
  display: block;
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
`;

const BlogInfo = styled.div`
  width: 100%;
  position: relative;
`;

const PostContent = styled.div`
  width: 100%;
  padding: ${PxtoRem(25)};
`;

const BlogTitle = styled.h1`
  position: absolute;
  top: 50px;
  left: 50px;
  color: white;
`;

const BlogDate = styled.h2`
  position: absolute;
  top: 80px;
  left: 50px;
  color: white;
`;

const Thumbnail = styled.div`
  width: 100%;
  padding-top: 60%;
  box-sizing: border-box;
  background-image: url(${props => `"${props.image}"`});
  background-position: center;
  background-size: cover;
  position: relative;
  &::before{
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
  }
`;

const OtherPosts = styled.div`
  width: 100%;
  padding: ${PxtoRem(25)};
  background-color: black;
`;
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pathContext
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  const { NavMenu, next, previous } = pathContext;
  let posts = [previous, next];
  let newPosts = [];
  for(let i = 0; i < 2 ; i++) {
    if(posts[i]){
      newPosts.push(posts[i]);
    }
  }
  console.log(posts);
  return (
    <Layout site={data.site.siteMetadata} NavMenu={NavMenu}>
      <ThemeProvider theme={themes}>
        <Content>
          <Helmet>
            <link src={MarkDownStyle} />
          </Helmet>
          <BlogPost className="blog-post-container">
            <div className="blog-post">
              <BlogInfo>
              <Thumbnail image={frontmatter.thumbnail} />
              <BlogTitle>{frontmatter.title}</BlogTitle>
              <BlogDate>{frontmatter.date}</BlogDate>
              </BlogInfo>
              <PostContent
                className="blog-post-content markdown-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </BlogPost>
          <OtherPosts className="clearFix">
            {newPosts.map( (item, index) => {
              return (<OtherPost key={`posts${index}`} post={item} index={index}/>);
            })}
          </OtherPosts>
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
        path,
        category,
        label,
        title,
        thumbnail,
      }
    }
  }
`;
