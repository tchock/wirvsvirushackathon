import * as React from "react";
import { Button, Grid, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";
import { useMutation } from "@apollo/react-hooks";
import { APPROVE_ORDER } from "../../../services/OrdersService";
import { Order } from "../../../../../types/order";

type Props = {
  order: Order;
};
export const SinglePendingOrder = (props: Props) => {
  const [isEditMode, setEditMode] = React.useState(false);
  const [onApproveOrder, { data }] = useMutation(APPROVE_ORDER, {
    variables: { nodeId: props.order.nodeId }
  });

  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    if (data?.orderAccept?.nodeId) {
      setShowAlert(true);
    }
  }, [data]);

  return (
    <>
      {/*// @todo: remove this check for data thing*/}
      {!data ? (
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
                  onClick={() => onApproveOrder()}
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
      ) : null}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <MuiAlert onClose={() => setShowAlert(false)} severity="success">
          This is a success message!
        </MuiAlert>
      </Snackbar>
    </>
  );
};
