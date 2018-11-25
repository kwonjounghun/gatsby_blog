import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { Content } from "../../styled-components/Common";
import PxtoRem from "../../modules/PxtoRem";

const HeaderSection = styled.header`
  width: 100%;
  height: ${PxtoRem(80)};
  background-color: black;
  right: 0;
  top: 0;
  box-shadow: 0px -3px 15px 2px ${props => props.theme.GrayScale.scale9};
`;

const Title = styled.h1`
  line-height: ${PxtoRem(80)};
`;

const NavContent = styled(Content)`
  position: relative;
  height: 100%;
`;

const NaviGation = styled.nav`
  width: 100%;
  position: absolute;
  display: none;
  bottom: 0;
  right: 0;
  transform: translate(0, 100%);
  padding-top: ${PxtoRem(25)};
  box-sizing: content-box;
  background-clip: content-box;
  ${props => props.theme.Media.large`width: 350px; display: block;`}
  ${props => props.theme.Media.xlarge`width: 350px; display: block;`}
`;

const NaviList = styled.ul`
  width: 100%;
  height: 100%;
  padding: ${PxtoRem(25)};
  background-color: white;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
`;

class Header extends Component {
  render() {
    console.log(this.props.NavMenu);
    return (
      <HeaderSection>
        <NavContent>
          <Title>{this.props.title}</Title>
          <NaviGation>
            <NaviList>
              <h2>Category</h2>
              {this.props.NavMenu.map((item, index) => {
                return (
                  <li key={index}>
                    <h2>{item.key}</h2>
                    <ul>
                      {item.list.map((item, index) => {
                        return (
                          <li key={index}>
                            <Link to={`/${item.key}/1`}>
                              {item.key}
                              {`(${item.count})`}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </NaviList>
          </NaviGation>
        </NavContent>
      </HeaderSection>
    );
  }
}

export default Header;
