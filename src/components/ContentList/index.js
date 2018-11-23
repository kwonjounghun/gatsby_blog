import React from "react";
import ContentItem from "../ContentItem";
import styled, { css, ThemeProvider } from "styled-components";
import PxtoRem from "../../modules/PxtoRem";
import Themes from "../../styled-components/themes";

const List = styled.ul(props => {
  return css`
    width: 100%;
    ${props.theme.Media.xlarge`width: ${PxtoRem(800)};`}
    ${props.theme.Media.large`width: ${PxtoRem(800)};`}
  `;
});

class ContentList extends React.Component {
  state = {
    items: [1, 2, 3, 4, 5]
  };
  render() {
    return (
      <ThemeProvider theme={Themes}>
        <List className="clearFix">
          {this.state.items.map((item, index) => {
            return <ContentItem key={`ContentItem${index}`} />;
          })}
        </List>
      </ThemeProvider>
    );
  }
}

export default ContentList;
