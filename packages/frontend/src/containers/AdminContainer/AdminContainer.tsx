import * as React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { AcceptedOrdersContainer } from "../AcceptedOrders/AcceptedOrdersContainer";
import { PendingApprovalOrdersContainer } from "../PendingApprovalOrders/PendingApprovalOrdersContainer";
import styled from "styled-components";
import { SingleDenyOrder } from '../PendingApprovalOrders/SingleDenyOrder/SingleDenyOrder';
import { SingleApproveOrder } from '../PendingApprovalOrders/SingleApproveOrder/SingleApproveOrder';

const AdminContainerWrapper = styled.div``;

type Props = {};
export const AdminContainer = (props: Props) => {
  return (
    <AdminContainerWrapper>
      <Switch>
        <Route
          path={"/admin/pending"}
          exact={true}
          component={PendingApprovalOrdersContainer}
        />
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
        <Route path={"/admin"} component={AcceptedOrdersContainer} />
      </Switch>
    </AdminContainerWrapper>
  );
};
