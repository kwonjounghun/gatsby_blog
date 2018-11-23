import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Header from "../components/Header";
import Themes from "../styled-components/themes";
import Helmet from "react-helmet";
import { Content } from "../styled-components/Common";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: ${props => (props.whiteColor ? "white" : "black")};
    font-family: ${props => props.theme.Fonts.family};
  }
`;

export default ({ children }) => {
  return (
    <>
      <Helmet>
        <title>블로그</title>
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={Themes}>
        <div className="app-wrapper">
          <GlobalStyle />
          <Header />
          <Content>{children}</Content>
        </div>
      </ThemeProvider>
    </>
  );
};
