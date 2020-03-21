import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminContainer } from "./containers/AdminContainer/AdminContainer";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, THEME } from "./theme";
import { BundleOverview } from "./containers/BundleOverview";
import { IntlProvider } from "react-intl";
import { Basket } from "./order/containers/Basket";
import { Confirmation } from "./order/containers/Confirmation";
import { AccountOrdersOverview } from "./account/containers/AccountOrdersOverview";
import { AccountOrderDetails } from "./account/containers/AccountOrderDetails";

const App = () => (
  <IntlProvider locale="en">
    <BundleOverview />
    <ThemeProvider theme={THEME}>
      <GlobalStyle theme={THEME} />
      <BrowserRouter>
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
      </BrowserRouter>
    </ThemeProvider>
  </IntlProvider>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
