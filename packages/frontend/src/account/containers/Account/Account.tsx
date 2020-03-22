import { Link, Route, Switch, matchPath, RouteComponentProps, Redirect } from "react-router-dom";
import React from "react";
import { Basket } from "../Basket";
import { AccountOrdersOverview } from "../AccountOrdersOverview";
import { AccountOrderDetails } from "../AccountOrderDetails";
import { Tabs, Tab, Box } from "@material-ui/core";

const navTabs = [
  {
    to: '/account/basket',
    label: 'Basket',
  },
  {
    to: '/account/orders',
    label: 'My Orders',
  },
];

export function Account({ match, location }: RouteComponentProps) {
  const selectedTab = navTabs.find(tab => matchPath(tab.to, { path: location.pathname }));
  
  if (matchPath(location.pathname, { path: match.path, exact: true })) {
    return <Redirect to={navTabs[0].to} />;
  }

  return <>
    <Box bgcolor="background.paper" mb={2}>
      <Tabs variant="fullWidth" value={selectedTab?.to} textColor="inherit">
        {navTabs.map(tab => <Tab component={Link} value={tab.to} to={tab.to} label={tab.label} />)}
      </Tabs>
    </Box>
    <Switch>
      <Route
        path="/account/basket"
        component={Basket}
      />
      <Route
        path="/account/orders"
        component={AccountOrdersOverview}
      />
      <Route
        path="/account/order/:pickUpCode"
        component={AccountOrderDetails}
      />
    </Switch>
  </>
}
