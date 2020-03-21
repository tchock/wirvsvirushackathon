import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { AcceptedOrdersContainer } from "./containers/AcceptedOrders/AcceptedOrdersContainer";

const App = () => (
  <BrowserRouter>
    <Route path={"/admin"} component={AcceptedOrdersContainer} />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
