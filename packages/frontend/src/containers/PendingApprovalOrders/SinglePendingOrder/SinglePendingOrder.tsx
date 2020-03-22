import * as React from "react";
import { Button, Grid } from "@material-ui/core";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";

type Props = {
  order: any;
};
export const SinglePendingOrder = (props: Props) => {
  const [isEditMode, setEditMode] = React.useState(false);

  return (
    <OrderSummaryWithActions order={props.order} isEditMode={isEditMode}>
      {isEditMode ? (
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary">
            Accept
          </Button>
        </Grid>
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
