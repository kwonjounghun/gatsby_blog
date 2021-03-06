import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { Content } from "../../styled-components/Common";
import PxtoRem from "../../modules/PxtoRem";

const HeaderSection = styled.header`
  width: ${PxtoRem(450)};
  height: 100vh;
  ${props => props.theme.Media.phone`width: 100%; height: ${PxtoRem(80)}`}
  ${props => props.theme.Media.tablet`width: 100%; height: ${PxtoRem(80)}`}
  background-color: ${props => props.theme.Color.gray[0]};
  top: 0;
  left: 0;
  box-shadow: 0px -3px 15px 2px ${props => props.theme.Color.gray[3]};
  position: fixed;
  ${props => props.theme.Media.desktop`position: absolute; padding-top: 0; width: ${PxtoRem(250)}; display: block;`}
  ${props => props.theme.Media.large`position: absolute; padding-top: 0; width: ${PxtoRem(400)}; display: block;`}
  ${props => props.theme.Media.xlarge`position: absolute; padding-top: 0; width: ${PxtoRem(600)}; display: block;`}
  z-index: 100;
`;

const Title = styled.h1`
  line-height: ${PxtoRem(80)};
  position: relative;
  padding-right: ${PxtoRem(20)};
  ${props => props.theme.Media.desktop`text-align: right;`}
  ${props => props.theme.Media.large`text-align: right;`}
  ${props => props.theme.Media.xlarge`text-align: right;`}
  z-index: 2;
`;

const NavContent = styled(Content)`
  position: relative;
  height: 100%;
  ${props => props.theme.Media.desktop`width: 100%;`}
  ${props => props.theme.Media.large`width: 100%;`}
  ${props => props.theme.Media.xlarge`width: 100%;`}
`;

const NaviGation = styled.nav`
  position: fixed;
  display: none;
  padding-top: ${PxtoRem(80)};
  z-index: 1;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: content-box;
  background-clip: content-box;
  ${props => props.theme.Media.tablet`position: fixed; right: 0; width: 350px;`}
  ${props => props.theme.Media.desktop`position: relative; top: inherit; padding-top: 0; width: ${PxtoRem(250)}; height: auto; display: block;`}
  ${props => props.theme.Media.large`position: relative; top: inherit; padding-top: 0; width: ${PxtoRem(400)}; height: auto; display: block;`}
  ${props => props.theme.Media.xlarge`position: relative; top: inherit; padding-top: 0; width: ${PxtoRem(600)}; height: auto; display: block;`}
  ${props => props.active ? "display: block" : "display: none"}
`;

const NaviList = styled.ul`
  width: 100%;
  height: 100%;
  text-align: right;
  padding: ${PxtoRem(25)};
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
  ${props => props.theme.Media.desktop`box-shadow: none; background-color: transparent;`}
  ${props => props.theme.Media.large`box-shadow: none; background-color: transparent;`}
  ${props => props.theme.Media.xlarge`box-shadow: none; background-color: transparent;`}
  h2{
    border-bottom: 1px solid black;
    padding-bottom: ${PxtoRem(10)};
    text-transform: uppercase;
  }
  overflow-y: auto;
  ${props => props.theme.Media.desktop`overflow-y: inherit;`}
  ${props => props.theme.Media.large`overflow-y: inherit;`}
  ${props => props.theme.Media.xlarge`overflow-y: inherit;`}
`;

const NaviListItem = styled.li`
  padding-left: ${PxtoRem(10)};
  box-sizing: border-box;
  margin-bottom: ${PxtoRem(20)};
`

const SubNaviList = styled.ul`
  padding-left: ${PxtoRem(10)};
  box-sizing: border-box;
`

const MenuBtn = styled.button`
  z-index: 2;
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  color: white;
  background-color: transparent;
  border: 0;
  .material-icons{
    font-size: ${props => props.theme.Fonts.size.h1};
  }
  ${props => props.theme.Media.desktop`display: none`}
  ${props => props.theme.Media.large`display: none`}
  ${props => props.theme.Media.xlarge`display: none`}
`;

class Header extends Component {
  state = {
    active: false
  }

  constructor(props) {
    super(props);
    this.header = React.createRef();
  }

  componentDidMount(){
    this.onChangeMenuSize();
  }

  onChangeMenuState = _ => {
    this.setState({active: !this.state.active});
  }

  onChangeMenuSize = _ => {
    window.addEventListener("resize", this.onCloseMenu);
  }

  onCloseMenu = _ => {
    if(this.state.active) this.setState({active: false});;
  }
  render() {
    return (
      <HeaderSection ref={ this.header  }>
        <NavContent>
          <Title><Link to="/">{this.props.title}</Link></Title>
          <MenuBtn onClick={this.onChangeMenuState}>
            <i className="material-icons">menu</i>
          </MenuBtn>
          <NaviGation active={this.state.active}>
            <NaviList>
              <h2>Category</h2>
              {this.props.NavMenu.map((item, index) => {
                return (
                  <NaviListItem key={index}>
                    <h3>{item.key}</h3>
                    <SubNaviList>
                      {item.list.map((item, index) => {
                        return (
                          <li key={index}>
                            <Link to={`/${item.key}/1`}>
                              {item.key}
                              {/* {`(${item.count})`} */}
                            </Link>
                          </li>
                        );
                      })}
                    </SubNaviList>
                  </NaviListItem>
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
