import * as React from "react";
import * as ReactDOM from "react-dom";
import { BundleOverview } from "./containers/BundleOverview";
import { IntlProvider } from "react-intl";

const App = () => (
  <IntlProvider locale="en">
    <BundleOverview />
  </IntlProvider>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
