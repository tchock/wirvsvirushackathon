import * as React from "react";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { Paper } from "@material-ui/core";

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
  render() {
    return (
      <Paper elevation={0}>
        {SAMPLE_ORDERS.map(order => (
          <OrderSummary {...order} />
        ))}
      </Paper>
    );
  }
}
