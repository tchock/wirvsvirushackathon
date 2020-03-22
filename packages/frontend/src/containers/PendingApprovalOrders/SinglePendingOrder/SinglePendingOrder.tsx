import * as React from "react";
import { Button, Grid } from "@material-ui/core";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";
import { Order } from "../../../../../types/order";

type Props = {
  order: Order;
  onApproveOrder: () => void;
};
export const SinglePendingOrder = (props: Props) => {
  const [isEditMode, setEditMode] = React.useState(false);

  return (
    <OrderSummaryWithActions order={props.order} isEditMode={isEditMode}>
      {isEditMode ? (
        <>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={props.onApproveOrder}
            >
              Accept
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="secondary">
              Reject
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setEditMode(true)}
            >
              Review
            </Button>
          </Grid>
        </>
      )}
    </OrderSummaryWithActions>
  );
};
