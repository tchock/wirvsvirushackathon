import { createGlobalStyle } from "styled-components";

export const THEME = {
  color: {
    grey: "#ddd"
  }
};

export const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: ${props => props.theme.color.grey};
  }`;
