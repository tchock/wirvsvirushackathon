import * as React from "react";
import { Route, withRouter } from "react-router";
import { Switch } from "react-router-dom";
import AcceptedOrdersContainer from "../AcceptedOrders/AcceptedOrdersContainer";
import styled from "styled-components";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Tab,
  Tabs
} from "@material-ui/core";
import { PendingApprovalOrdersContainer } from "../PendingApprovalOrders/PendingApprovalOrdersContainer";
import { getSpacing } from "../../theme";
import { QrScannerContainer } from "../QrScannerContainer/QrScannerContainer";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";

const AdminContainerWrapper = styled.div``;

const ContentContainer = styled.div`
  padding: 0 ${getSpacing(2)}px;
  margin-bottom: ${getSpacing(20)}px;
`;

const BottomNavigationWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
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
        </Tabs>
      </AppBar>
      <ContentContainer>
        <Switch>
          <Route path="/admin/accepted" component={AcceptedOrdersContainer} />
          <Route path="/admin/scanner" component={QrScannerContainer} />
          <Route path="/admin" component={PendingApprovalOrdersContainer} />
        </Switch>
      </ContentContainer>
      <BottomNavigationWrapper>
        <BottomNavigation
          value={props.location.pathname}
          onChange={(event, value) => {
            props.history.push(value);
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Camera Scan"
            icon={<CameraAltOutlinedIcon />}
            value="/admin/scanner"
          />
        </BottomNavigation>
      </BottomNavigationWrapper>
    </AdminContainerWrapper>
  );
};

export default withRouter(AdminContainer);
