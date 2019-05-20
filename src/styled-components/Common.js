import styled from "styled-components";
import PxtoRem from "../modules/PxtoRem";
import Themes from './themes';

console.log(Themes);

export const Content = styled.div`
    margin: 0 auto;
    ${props => props.theme.Media.xlarge`width: ${PxtoRem(props.theme.BreakPoint.large.min - 100)};`}
    ${props => props.theme.Media.large`width: ${PxtoRem(props.theme.BreakPoint.large.min - 100)};`}
    ${props => props.theme.Media.desktop`width: ${PxtoRem(props.theme.BreakPoint.desktop.min - 100)};`}
    ${props => props.theme.Media.tablet`width: ${PxtoRem(props.theme.BreakPoint.tablet.min - 100)};`}
    ${props => props.theme.Media.phone`width: 100%; padding: 0 0 0 1rem;`}
`

export const typographys = {};

const Heading1 = props => `
    font-size: 
`;
