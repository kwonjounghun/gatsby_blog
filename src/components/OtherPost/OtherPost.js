import React from 'react';
import { Link } from "gatsby";
import styled from "styled-components";
import PxtoRem from "../../modules/PxtoRem";

const PostWrap = styled(Link)`
    margin-left: 4%;
    ${props => props.index === 0 && "margin-left: 0;"}
    width: 48%;
    float: left;
    position: relative;
    ${props => props.theme.Media.phone`width: 100%; margin-left: 0; margin-bottom: ${PxtoRem(20)}`}
`;

const Thumbnail = styled.div`
     width: 100%; 
    padding-top: 70%;
    transition: all 0.2s;
    margin-right: ${PxtoRem(50)};
    float: left;
    position: relative;
    ${props => props.theme.Media.phone`
    padding-top: 40%;
    `}
    ${props => props.image ? `background-image: url("${props.image}");` : null}
    background-size: cover;
    background-position: center;
`;

const OtherPost = ({ post, index }) => {
    const { frontmatter, excerpt } = post;
    console.log(post);
    return (
        <PostWrap to={frontmatter.path} index={index}>
            <Thumbnail image={frontmatter.thumbnail} />
            {frontmatter.title}</PostWrap>
    );
}

export default OtherPost;