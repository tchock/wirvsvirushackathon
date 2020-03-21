import { createGlobalStyle } from "styled-components";

export const THEME = {
  color: {
    grey: "#ddd"
  }
};
export const getSpacing = value => `${value * 8}px`;

export type ThemeConfig = typeof THEME;

export const GlobalStyle = createGlobalStyle<{ theme: ThemeConfig }>`
  html, body {
    background-color: ${props => props.theme.color.grey};
    padding: ${getSpacing(3)} ${getSpacing(2)};
  }`;
