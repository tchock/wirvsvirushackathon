import * as React from "react";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";
import { Button, Grid } from "@material-ui/core";

type Props = {};
type State = {};

export class SingleDenyOrder extends React.Component<Props, State> {
  render() {
    return (
      <OrderSummaryWithActions order={this.props.order}>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="default">
            Too Many Orders
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="default">
            Out of Product
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="default">
            Other
          </Button>
        </Grid>
      </OrderSummaryWithActions>
    );
  }
}
