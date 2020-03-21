import * as React from "react";
import { Button, Grid } from "@material-ui/core";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";

type Props = {
  order: any;
};
type State = {};

export class SingleApproveOrder extends React.Component<Props, State> {
  render() {
    return (
      <OrderSummaryWithActions order={this.props.order}>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="secondary">
            Change Pickup time
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            Accept Order
          </Button>
        </Grid>
      </OrderSummaryWithActions>
    );
  }
}
