import * as React from "react";
import { Route, withRouter } from "react-router";
import { Switch } from "react-router-dom";
import AcceptedOrdersContainer from "../AcceptedOrders/AcceptedOrdersContainer";
import styled from "styled-components";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { ReadyOrdersContainer } from "../ReadyOrdersContainer/ReadyOrdersContainer";
import { PendingApprovalOrdersContainer } from "../PendingApprovalOrders/PendingApprovalOrdersContainer";
import { getSpacing } from "../../theme";
import { PickUpOrderContainer } from "../PickUpOrderContainer/PickUpOrderContainer";

const AdminContainerWrapper = styled.div``;

const ContentContainer = styled.div`
  padding: 0 ${getSpacing(2)}px;
`;

type Props = {
  history: any;
  location: any;
};
const AdminContainer = (props: Props) => {
  const handleChange = (event, value) => props.history.push(value);

  return (
    <AdminContainerWrapper>
      <AppBar position="static">
        <Tabs
          value={props.location.pathname}
          onChange={handleChange}
          aria-label="Top Navigation"
          variant="fullWidth"
          color="default"
        >
          <Tab label="New" value="/admin" />
          <Tab label="Accepted" value="/admin/accepted" />
          <Tab label="Ready" value="/admin/ready" />
        </Tabs>
      </AppBar>
      <ContentContainer>
        <Switch>
          <Route path="/admin/accepted" component={AcceptedOrdersContainer} />
          <Route path="/admin/ready" component={ReadyOrdersContainer} />
          <Route path="/admin/pickup/:id" component={PickUpOrderContainer} />
          <Route path="/admin" component={PendingApprovalOrdersContainer} />
        </Switch>
      </ContentContainer>
    </AdminContainerWrapper>
  );
};

export default withRouter(AdminContainer);
