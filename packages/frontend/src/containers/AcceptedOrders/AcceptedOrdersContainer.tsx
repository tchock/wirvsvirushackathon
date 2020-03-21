import * as React from "react";
import { SingleAcceptedOrder } from "./SingleAcceptedOrder/SingleAcceptedOrder";

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

export class AcceptedOrdersContainer extends React.Component<Props, State> {
  onPaidConfirmed = () => {
    console.log('paid')
  };

  onPickedUpConfirmed = () => {
    console.log('pickedup')
  };

  render() {
    return SAMPLE_ORDERS.map(order => (
      <SingleAcceptedOrder
        order={order}
        onPaidConfirmed={this.onPaidConfirmed}
        onPickedUpConfirmed={this.onPickedUpConfirmed}
      />
    ));
  }
}
