import * as React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";

type Props = {
  order: any;
};
export const SinglePendingOrder = (props: Props) => {
  return (
    <OrderSummaryWithActions order={props.order}>
      <Grid item xs={6}>
        <Link
          to="/admin/pending/1/approve"
          fullWidth
          variant="contained"
          color="primary"
          component={Button}
        >
          Accept Order
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link
          to="/admin/pending/1/deny"
          fullWidth
          variant="contained"
          color="secondary"
          component={Button}
        >
          Deny Order
        </Link>
      </Grid>
    </OrderSummaryWithActions>
  );
};
