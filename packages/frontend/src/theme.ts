import { createGlobalStyle } from "styled-components";
import { createMuiTheme, Theme } from "@material-ui/core";

export const THEME = createMuiTheme({
  palette: {
    primary: {
      main: "#05c46b",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#ffd32a"
    }
  }
} as Partial<Theme>);

export type ThemeConfig = typeof THEME;

export const GlobalStyle = createGlobalStyle<{ theme: ThemeConfig }>`
  html, body {
    background-color: ${props => props.theme.palette.secondary.main};
  }`;
