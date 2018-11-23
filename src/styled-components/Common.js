import styled, {css} from "styled-components";
import PxtoRem from "../modules/PxtoRem";

export const Content = styled.div(props => {
    return (css`
        background-color: yellow;
        margin: 0 auto;
        ${props.theme.Media.xlarge`width: ${PxtoRem(props.theme.BreakPoint.large.min-100)};`}
        ${props.theme.Media.large`width: ${PxtoRem(props.theme.BreakPoint.large.min-100)};`}
        ${props.theme.Media.desktop`width: ${PxtoRem(props.theme.BreakPoint.desktop.min-100)};`}
        ${props.theme.Media.tablet`width: ${PxtoRem(props.theme.BreakPoint.tablet.min-100)};`}
        ${props.theme.Media.phone`width: 100%;`}
    `)
})