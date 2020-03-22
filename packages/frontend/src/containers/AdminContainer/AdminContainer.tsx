import * as React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { AcceptedOrdersContainer } from "../AcceptedOrders/AcceptedOrdersContainer";
import styled from "styled-components";
import { PendingApprovalOrdersRouter } from "../PendingApprovalOrders/PendingApprovalOrdersRouter";

const AdminContainerWrapper = styled.div``;

type Props = {};
export const AdminContainer = (props: Props) => {
  return (
    <AdminContainerWrapper>
      <Switch>
        <Route
          path={"/admin/pending"}
          component={PendingApprovalOrdersRouter}
        />
        <Route
          path={"/admin"}
          component={AcceptedOrdersContainer}
        />
      </Switch>
    </AdminContainerWrapper>
  );
};
