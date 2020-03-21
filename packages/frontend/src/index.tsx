import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminContainer } from "./containers/AdminContainer/AdminContainer";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, THEME } from "./theme";
import { BundleOverview } from "./containers/BundleOverview";
import { IntlProvider } from "react-intl";

const App = () => (
  <IntlProvider locale="en">
    <BundleOverview />
    <ThemeProvider theme={THEME}>
      <GlobalStyle theme={THEME} />
      <BrowserRouter>
        <Switch>
          <Route path={"/admin"} component={AdminContainer} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </IntlProvider>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
