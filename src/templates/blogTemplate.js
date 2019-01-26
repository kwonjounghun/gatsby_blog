import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../layout";
import OtherPost from "../components/OtherPost";
import PxtoRem from "../modules/PxtoRem";
import themes from "../styled-components/themes";
import Helmet from "react-helmet";
import MarkDownStyle from "../../static/assets/style/markdown.css";

const Box = styled.div`
  padding-top: ${PxtoRem(80)};
  box-sizing: border-box;
  width: 100%;
  // height: 100vh;
  // position: fixed;
  top: 0;
  left: 0;
  ${props =>
    props.theme.Media
      .xlarge`position: absolute; padding-top: 0; padding-left: ${PxtoRem(
      600
    )}; height: 100vh;`}
  ${props =>
    props.theme.Media
      .large`position: absolute; padding-top: 0; padding-left: ${PxtoRem(
      400
    )}; height: 100vh;`}
  ${props =>
    props.theme.Media
      .desktop`position: absolute; padding-top: 0; padding-left: ${PxtoRem(
      250
    )}; height: 100vh;`}
`;

const Wrap = styled.div`
  width: 100%;
  // height: 100%;
  // overflow-y: auto;
  position: relative;
`;

const Content = styled.div`
  ${props => props.theme.Media.xlarge`width: ${PxtoRem(800)};`}
  ${props => props.theme.Media.large`width: ${PxtoRem(800)};`}
  ${props => props.theme.Media.desktop`width: ${PxtoRem(700)};`}
`;

const BlogPost = styled.div`
  display: block;
  width: 100%;
  background-color: ${props => props.theme.Color.dark.content};
`;

const BlogInfo = styled.div`
  width: 100%;
  position: relative;
`;

const PostContent = styled.div`
  width: 100%;
  padding: ${PxtoRem(25)};
`;

const Thumbnail = styled.div`
  width: 100%;
  padding-top: 60%;
  box-sizing: border-box;
  background-image: url(${props => `"${props.image}"`});
  background-position: center;
  background-size: cover;
  position: relative;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const MainContent = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: ${PxtoRem(50)};
  z-index: 2;
  ${props =>
    props.theme.Media.phone`padding: ${PxtoRem(
      20
    )}; text-align: center; bottom: 50%; transform: translate(0, 50%);`}
`;

const Title = styled.h2`
  font-size: ${props => props.theme.Fonts.size.h2};
  color: white;
  z-index: 2;
  line-height: 1.4;
  word-break: break-all;
  margin-bottom: 0;
  ${props =>
    console.log(
      props.theme.Fonts.size.h2,
      parseFloat(props.theme.Fonts.size.h2, 10) * 16 * 1.4 * 3
    )}
  max-height: ${props =>
    `${PxtoRem(parseFloat(props.theme.Fonts.size.h2, 10) * 16 * 1.4 * 3)}`};
  overflow: hidden;
  ${props =>
    props.theme.Media.tablet`font-size: ${
      props.theme.Fonts.size.h3
    }; max-height: ${props =>
      `${PxtoRem(parseFloat(props.theme.Fonts.size.h3, 10) * 16 * 1.4 * 3)}`};`}
  ${props =>
    props.theme.Media.phone`font-size: ${
      props.theme.Fonts.size.h4
    }; max-height: ${props =>
      `${PxtoRem(parseFloat(props.theme.Fonts.size.h4, 10) * 16 * 1.4 * 2)}`};`}
`;

const BlogDate = styled.time`
  color: white;
  font-size: ${props => props.theme.Fonts.size.small};
`;

const Category = styled.div`
  padding: ${`${PxtoRem(5)} ${PxtoRem(20)}`};
  margin-bottom: ${PxtoRem(10)};
  background-color: ${props => props.theme.GrayScale.scale6};
  color: white;
  line-height: 1rem;
  display: inline-block;
  border-radius: ${PxtoRem(20)};
  transform: scale(0.8);
  transform-origin: 0 100%;
  ${props => props.theme.Media.phone`transform-origin: 50% 50%;`}

  span {
    color: white;
    vertical-align: top;
    font-size: ${props => props.theme.Fonts.size.small};
    text-transform: uppercase;
  }
`;

const OtherPosts = styled.div`
  width: 100%;
  padding: ${PxtoRem(25)};
  background-color: black;
  margin-bottom: ${PxtoRem(50)};
`;
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pathContext
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html, excerpt } = markdownRemark;
  const { NavMenu, next, previous } = pathContext;
  let posts = [previous, next];
  let newPosts = [];
  for (let i = 0; i < 2; i++) {
    if (posts[i]) {
      newPosts.push(posts[i]);
    }
  }
  return (
    <Layout site={data.site.siteMetadata} NavMenu={NavMenu}>
      <Helmet>
        <title>{frontmatter.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:discription" content={excerpt} />
        <link src={MarkDownStyle} />
      </Helmet>
      <Box>
        <Wrap>
          <Content>
            <BlogPost className="blog-post-container">
              <div className="blog-post">
                <BlogInfo>
                  <Thumbnail image={frontmatter.thumbnail}>
                    <MainContent>
                      <Category>
                        <span>{frontmatter.category}</span>
                      </Category>
                      <Title>{frontmatter.title}</Title>
                      <BlogDate>{frontmatter.date}</BlogDate>
                    </MainContent>
                  </Thumbnail>
                </BlogInfo>
                <PostContent
                  className="blog-post-content markdown-body"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </BlogPost>
            <OtherPosts className="clearFix">
              {newPosts.map((item, index) => {
                return (
                  <OtherPost key={`posts${index}`} post={item} index={index} />
                );
              })}
            </OtherPosts>
          </Content>
        </Wrap>
      </Box>
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
      excerpt
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        category
        label
        title
        thumbnail
      }
    }
  }
`;
