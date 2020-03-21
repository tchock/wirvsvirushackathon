import * as React from "react";
import { SingleAcceptedOrder } from "./SingleAcceptedOrder/SingleAcceptedOrder";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { getSpacing } from "../../theme";

type Props = {};
type State = {};

const SAMPLE_ORDERS = [
  {
    pickUpCode: "#1111",
    name: "bundle extreme",
    pickUpTime: "13:00 H",
    bundleId: "#11314",
    price: "5.00"
  }
];

const TopNavigation = styled.div`
  padding-bottom: ${getSpacing(2)};
`;

export class AcceptedOrdersContainer extends React.Component<Props, State> {
  onPaidConfirmed = () => {
    console.log("paid");
  };

  onPickedUpConfirmed = () => {
    console.log("pickedup");
  };

  render() {
    return SAMPLE_ORDERS.map(order => (
      <>
        <TopNavigation>
          <Link
            to="/admin/pending"
            component={Button}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Pending Approval Orders
          </Link>
        </TopNavigation>
        <SingleAcceptedOrder
          order={order}
          onPaidConfirmed={this.onPaidConfirmed}
          onPickedUpConfirmed={this.onPickedUpConfirmed}
        />
      </>
    ));
  }
}
