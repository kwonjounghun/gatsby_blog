import React, { Component } from "react";
import styled from "styled-components";
import PxtoRem from "../../modules/PxtoRem";

const HeaderSection = styled.header`
    width: 100%;
    height: ${PxtoRem(80)};
    background-color: black;
    right: 0;
    top: 0;
`;

class Header extends Component {
    render () {
        return (
            <HeaderSection>header</HeaderSection>
        )
    }
}

export default Header;