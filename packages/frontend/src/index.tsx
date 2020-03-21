import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Box, MuiThemeProvider } from "@material-ui/core";
import { AdminContainer } from "./containers/AdminContainer/AdminContainer";
import { GlobalStyle, THEME } from "./theme";
import { BundleOverview } from "./containers/BundleOverview";
import { IntlProvider } from "react-intl";
import { Basket } from "./order/containers/Basket";
import { Confirmation } from "./order/containers/Confirmation";
import { AccountOrdersOverview } from "./account/containers/AccountOrdersOverview";
import { AccountOrderDetails } from "./account/containers/AccountOrderDetails";

const App = () => (
  <IntlProvider locale="en">
    <MuiThemeProvider theme={THEME}>
      <ThemeProvider theme={THEME}>
        <GlobalStyle />
        <BrowserRouter>
          <Box m={{ xs: 0, md: 5 }}>
            <Switch>
              <Route path="/" exact component={BundleOverview} />
              <Route path="/order/basket" component={Basket} />
              <Route path="/order/confirmation" component={Confirmation} />
              <Route path="/account/orders" component={AccountOrdersOverview} />
              <Route
                path="/account/order/:pickUpCode"
                component={AccountOrderDetails}
              />
              <Route path="/admin" component={AdminContainer} />
            </Switch>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </MuiThemeProvider>
  </IntlProvider>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
