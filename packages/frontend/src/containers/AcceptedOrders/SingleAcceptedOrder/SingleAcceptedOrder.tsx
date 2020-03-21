import * as React from "react";
import { Button, Grid } from "@material-ui/core";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";
import { Order } from '../../../../../types/order';

type Props = {
  order: Order;
  onPaidConfirmed: () => void;
  onPickedUpConfirmed: () => void;
};
export const SingleAcceptedOrder = (props: Props) => {
  return (
    <OrderSummaryWithActions order={props.order}>
      <Grid item md={6} xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={props.onPaidConfirmed}
        >
          Paid
        </Button>
      </Grid>
      <Grid item md={6} xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={props.onPickedUpConfirmed}
        >
          Picked-up
        </Button>
      </Grid>
    </OrderSummaryWithActions>
  );
};
