import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Themes from "../styled-components/themes";
import Helmet from "react-helmet";
import colors from "open-color";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: ${props => props.theme.Color.gray[8]};
    font-family: ${props => props.theme.Fonts.family};
    background-color: ${props => props.theme.Color.gray[1]}
  }

  div, section, header, nav, footer, a {
      box-sizing: border-box;
  }

  p, h1, h2, h3, h4, span, div {
    margin: 0;
    padding: 0;
    line-height: 1.6;
    color: ${props => props.theme.Color.gray[6]};
  }

  p, h1, h2, h3, h4, span{
      margin-bottom: 0.5em;
  }

  a, a:active, a:hover, a:link {
      line-height: 1.6;
      color: ${props => props.theme.Color.gray[6]};
      text-decoration: none;
  }

  h1, h2, h3, h4{
    color: ${props => props.theme.Color.gray[8]};
  }

  ul, ol, li{
      margin: 0;
      padding: 0;
      list-style: none;
  }

  .clearFix::after{
      display: block;
      content: "";
      clear: both;
  }
 
  .material-icons {
      font-family: 'Material Icons';
      font-size: 24px;
  }

  /* width */
::-webkit-scrollbar {
  width: 10px;
  border-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
  border-radius: 5px;
}
`;

export default ({ children, site, NavMenu }) => {
  console.log(colors)
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
          <Header title={site.title} NavMenu={NavMenu}/>
            {children}
        </div>
      </ThemeProvider>
    </>
  );
};
