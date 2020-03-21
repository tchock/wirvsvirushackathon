import * as React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { AcceptedOrdersContainer } from "../AcceptedOrders/AcceptedOrdersContainer";
import { PendingApprovalOrdersContainer } from "../PendingApprovalOrders/PendingApprovalOrdersContainer";
import styled from "styled-components";

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
        <Route path={"/admin"} component={AcceptedOrdersContainer} />
      </Switch>
    </AdminContainerWrapper>
  );
};
