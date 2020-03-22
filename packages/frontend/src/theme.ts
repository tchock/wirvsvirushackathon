import { createGlobalStyle } from "styled-components";
import { createMuiTheme, Theme } from "@material-ui/core";

export const THEME = createMuiTheme({
  palette: {
    primary: {
      main: "#05c46b",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#FFA801"
    }
  }
} as Partial<Theme>);

export const getSpacing = (value: number) => (props) => props.theme.spacing(value);

export type ThemeConfig = typeof THEME;

export const GlobalStyle = createGlobalStyle<{ theme: ThemeConfig }>`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #F5F5F5;
  }`;
