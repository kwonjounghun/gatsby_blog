import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import PxtoRem from "../../modules/PxtoRem";

const PostWrap = styled(Link)`
  margin-left: 4%;
  ${props => props.index === 0 && "margin-left: 0;"}
  width: 48%;
  float: left;
  position: relative;
  ${props =>
    props.theme.Media
      .phone`width: 100%; margin-left: 0; ${props.index === 0 && `margin-bottom: ${PxtoRem(10)}`}`}
`;

const ThumbnailWrap = styled.div`
  width: 100%;
  padding-top: 70%;
  transition: all 0.2s;
  margin-right: ${PxtoRem(50)};
  margin-bottom: ${PxtoRem(10)};
  position: relative;
  ${props =>
    props.theme.Media
      .phone`padding-top: 40%; margin-bottom: 0;`}
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.2s;
  position: absolute;
  top: 0;
  left: 0;
  ${props => (props.image ? `background-image: url("${props.image}");` : null)}
  background-size: cover;
  background-position: center;
  &::before {
    display: block;
    width: 100%;
    height: 100%;
    content: "";
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

const Content = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: ${PxtoRem(20)};
  z-index: 2;
  ${props => props.theme.Media.phone`text-align: center; bottom: 50%; transform: translate(0, 50%);`}
`;

const Title = styled.h2`
  font-size: ${props => props.theme.Fonts.size.h2};
  color: white;
  z-index: 2;
  line-height: 1.4;
  word-break: break-all;
  margin-bottom: 0;
  ${props => console.log(props.theme.Fonts.size.h2, parseFloat(props.theme.Fonts.size.h2, 10)*16*1.4*3)}
  max-height: ${props => `${PxtoRem(parseFloat(props.theme.Fonts.size.h2, 10)*16*1.4*3)}`};
  overflow: hidden;
  ${props => props.theme.Media.tablet`font-size: ${props.theme.Fonts.size.h3}; max-height: ${props => `${PxtoRem(parseFloat(props.theme.Fonts.size.h3, 10)*16*1.4*3)}`};`}
  ${props => props.theme.Media.phone`font-size: ${props.theme.Fonts.size.h4}; max-height: ${props => `${PxtoRem(parseFloat(props.theme.Fonts.size.h4, 10)*16*1.4*2)}`};`}
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

  span{
    color: white;
      vertical-align: top;
      font-size: ${props => props.theme.Fonts.size.small};
      text-transform: uppercase;
  }
`;

const Excerpt = styled.p`
  width: 100%;
  ${props => props.theme.Media.phone`display: none;`}
`;

const OtherPost = ({ post, index }) => {
  const { frontmatter, excerpt } = post;
  console.log(post);
  return (
    <PostWrap to={frontmatter.path} index={index}>
      <ThumbnailWrap>
        <Thumbnail image={frontmatter.thumbnail} />
        <Content>
            <Category><span>{frontmatter.category}</span></Category>
          <Title>{frontmatter.title}</Title>
        </Content>
      </ThumbnailWrap>
      <Excerpt>{excerpt}</Excerpt>
    </PostWrap>
  );
};

export default OtherPost;
