import * as React from "react";
import { Route, Switch } from "react-router";
import SingleApproveOrder  from "./SingleApproveOrder/SingleApproveOrder";
import SingleDenyOrder from "./SingleDenyOrder/SingleDenyOrder";
import { PendingApprovalOrdersContainer } from "./PendingApprovalOrdersContainer";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { TopNavigation } from "../../components/TopAdminNavigation/TopAdminNavigation";

type Props = {};
export const PendingApprovalOrdersRouter = (props: Props) => {
  return (
    <>
      <TopNavigation>
        <Link
          to="/admin"
          component={Button}
          fullWidth={true}
          variant="contained"
          color="default"
        >
          Back to Accepted Orders
        </Link>
      </TopNavigation>
      <Switch>
        <Route
          path={"/admin/pending/:id/approve"}
          exact={true}
          component={SingleApproveOrder}
        />
        <Route
          path={"/admin/pending/:id/deny"}
          exact={true}
          component={SingleDenyOrder}
        />
        <Route
          path={"/admin/pending/"}
          exact={true}
          component={PendingApprovalOrdersContainer}
        />
      </Switch>
    </>
  );
};
