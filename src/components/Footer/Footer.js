import React from "react";
import styled from "styled-components";
import { Content } from "../../styled-components/Common";

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  background-color: black;
`;

export default class extends React.Component {
  render() {
    return (
      <Footer>
        <Content>footer</Content>
      </Footer>
    );
  }
}
