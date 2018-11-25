import React from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { Link } from "gatsby";
import PxtoRem from "../../modules/PxtoRem";
import Themes from "../../styled-components/themes";

const Item = styled(Link)`
  display: block;
  width: 100%;
  position: relative;
  padding: ${PxtoRem(25)};
  ${props => props.theme.Media.xlarge`padding-left: ${PxtoRem(170)};`}
  ${props => props.theme.Media.large`padding-left: ${PxtoRem(170)};`}
  ${props => props.theme.Media.desktop`padding-left: ${PxtoRem(170)};`}
  ${props => props.theme.Media.tablet`padding-left: ${PxtoRem(155)};`}
  background-color: white;
  margin-bottom: ${PxtoRem(10)};
  border-bottom: 1px solid ${props => props.theme.GrayScale.scale3};
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
  &:hover{
      &::before{
          display: block;
          content: "";
          width: 2px;
          height: 100%;
          background-color: red;
          position: absolute;
          top: 0;
          left: 0; 
      }
      h1{
          color: red;
      }
  }
`;

const Thumbnail = styled.div(props => {
  return css`
    width: ${PxtoRem(80)};
    height: ${PxtoRem(160)};
    transition: all 0.2s;
    margin-right: ${PxtoRem(50)};
    float: left;
    top: ${PxtoRem(25)};
    left: ${PxtoRem(25)};
    position: absolute;
    ${props.theme.Media.xlarge`width: ${PxtoRem(100)}; height: ${PxtoRem(
      180
    )};`}
    ${props.theme.Media.large`width: ${PxtoRem(100)}; height: ${PxtoRem(180)};`}
    ${props.theme.Media.desktop`width: ${PxtoRem(100)}; height: ${PxtoRem(
      180
    )};`}
    ${props.theme.Media.phone`
    width: 100%; 
    padding-top: 70%;
    margin-left: 0;
    margin-bottom: ${PxtoRem(15)}
    position: relative;
    top: 0;
    left: 0;
    `}
    ${props.image ? `background-image: url("${props.image}");` : null}
    background-size: cover;
    background-position: center;
    `;
});

const Categroy = styled.div`
  font-size: ${props => props.theme.Fonts.size.small};
  position: relative;
  padding-left: 1.5rem;
  .material-icons{
      font-size: ${props => props.theme.Fonts.size.p};
      margin-right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      left: 0;
  }
`;

const Date = styled(Categroy)`
  position: absolute;
  top: 0;
  right: 0;
`;

const Excerpt = styled.p`
  min-height: 6.5rem;
`;

const ItemContent = styled.div`
  float: left;
  position: relative;
`;

class ContentItem extends React.Component {
  render() {
    console.log("item", this.props.item);
    let { node } = this.props.item;
    let { frontmatter, excerpt } = node;
    let { thumbnail, date, title, category, path } = frontmatter;
    return (
      <li>
        <ThemeProvider theme={Themes}>
          <Item className="clearFix" to={path}>
            <Thumbnail image={thumbnail} />
            <ItemContent className="clearFix">
              <Categroy>
                <i className="material-icons">local_offer</i>
                {category}
              </Categroy>
              <h1>{title}</h1>
              <Excerpt>{excerpt}</Excerpt>
              <Date>
                <i className="material-icons">access_time</i>
                {date}
              </Date>
            </ItemContent>
          </Item>
        </ThemeProvider>
      </li>
    );
  }
}

export default ContentItem;
