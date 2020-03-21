import * as React from "react";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";
import { Button, Grid } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { DENY_ORDER, GET_ORDER } from "../../../services/OrdersService";
import { Order } from "../../../../../types/order";
import { withRouter } from "react-router";

type Props = {
  match: any;
};

const SingleDenyOrder = (props: Props) => {
  const orderId = props.match.params.id;
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { nodeId: orderId }
  });
  const [onDenyOrder] = useMutation(DENY_ORDER, {
    variables: { nodeId: orderId }
  });

  if (loading || error) return null;

  const order: Order = data.order;

  return (
    <OrderSummaryWithActions order={order}>
      <Grid item md={4} xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="default"
          onClick={() => onDenyOrder()}
        >
          Too Many Orders
        </Button>
      </Grid>
      <Grid item md={4} xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="default"
          onClick={() => onDenyOrder()}
        >
          Out of Product
        </Button>
      </Grid>
      <Grid item md={4} xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="default"
          onClick={() => onDenyOrder()}
        >
          Other
        </Button>
      </Grid>
    </OrderSummaryWithActions>
  );
};

export default withRouter(SingleDenyOrder);
