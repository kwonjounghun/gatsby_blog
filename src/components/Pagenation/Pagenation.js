import React from "react";
import styled from "styled-components";
import PxtoRem from "../../modules/PxtoRem";
import { Link } from "gatsby";

const Content = styled.div`
  width: 100%;
  position: relative;
  height: ${PxtoRem(50)};
  margin-top: ${PxtoRem(50)};
  margin-bottom: ${PxtoRem(50)};
`;

const PageList = styled.ul`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  li {
    display: inline-block;
    margin-right: 0.3rem;
  }
`;

const ListItem = styled(Link)`
  display: block;
  background-color: white;
  width: ${PxtoRem(45)};
  height: ${PxtoRem(45)};
  line-height: ${PxtoRem(45)};
  box-sizing: content-box;
  text-align: center;
  border-bottom: 3px solid ${props => props.theme.GrayScale.scale5};
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  ${props => props.theme.Media.phone`width: ${PxtoRem(30)};
  height: ${PxtoRem(30)};
  line-height: ${PxtoRem(30)};`}
  &:link {
    line-height: ${PxtoRem(45)};
    ${props => props.theme.Media.phone`line-height: ${PxtoRem(30)};`}
  }
  &:hover{
      color: red;
      border-color: red;
  }
  ${props => (props.active === "active" ? "border-color: red; color: red; font-weight: 700;" : "")}
`;

class Pagenation extends React.Component {
  render() {
    const { current, postLimit, skip, totalPage, category } = this.props;
    let pageViewList = [];
    let prevCount = totalPage - current < 2 ? 4 - (totalPage - current) : 2;
    let startPage = current - prevCount > 0 ? current - prevCount : 1;
    let page = category ? `/${category}` : "/";
    for (let i = 0; i < 5; i++) {
      if (startPage <= totalPage) {
        pageViewList.push(startPage);
      }
      startPage++;
    }
    console.log(pageViewList);
    return (
      <Content>
        <PageList>
          {pageViewList.map((item, index) => {
            let pageNum = !category && item === 1 ? "/" : `${page}/${item}`;
            return (
              <li key={index}>
                <ListItem
                  to={pageNum}
                  active={item === current ? "active" : "none"}
                >
                  {item}
                </ListItem>
              </li>
            );
          })}
        </PageList>
      </Content>
    );
  }
}

export default Pagenation;
