import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Box, MuiThemeProvider, StylesProvider } from "@material-ui/core";
import AdminContainer from "./containers/AdminContainer/AdminContainer";
import { GlobalStyle, THEME } from "./theme";
import { IntlProvider } from "react-intl";
import { App } from "./containers/App";
import { client } from "./graphQl";
import { ApolloProvider } from "@apollo/react-hooks";

const Wrapper = () => (
  <StylesProvider injectFirst>
    <IntlProvider locale="en">
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={THEME}>
          <ThemeProvider theme={THEME}>
            <GlobalStyle />
            <BrowserRouter>
              <Switch>
                <Route path="/admin" component={AdminContainer} />
                <Route path="/" component={App} />
              </Switch>
            </BrowserRouter>
          </ThemeProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    </IntlProvider>
  </StylesProvider>
);

ReactDOM.render(<Wrapper />, document.getElementById("root") as HTMLElement);
