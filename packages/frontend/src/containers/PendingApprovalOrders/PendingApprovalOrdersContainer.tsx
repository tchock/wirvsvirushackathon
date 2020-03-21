import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { TopNavigation } from "../../components/TopAdminNavigation/TopAdminNavigation";
import { SinglePendingOrder } from "./SinglePendingOrder/SinglePendingOrder";

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

export class PendingApprovalOrdersContainer extends React.Component<
  Props,
  State
> {
  render() {
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
        {SAMPLE_ORDERS.map(order => (
          <SinglePendingOrder
            order={order}
          />
        ))}
      </>
    );
  }
}
