import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminContainer } from "./containers/AdminContainer/AdminContainer";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, THEME } from "./theme";

const App = () => (
  <ThemeProvider theme={THEME}>
    <GlobalStyle theme={THEME} />
    <BrowserRouter>
      <Switch>
        <Route path={"/admin"} component={AdminContainer} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
