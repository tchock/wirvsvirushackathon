import * as React from "react";
import { Button, Grid } from "@material-ui/core";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Order } from "../../../../../types/order";
import { APPROVE_ORDER, GET_ORDER } from "../../../services/OrdersService";
import { withRouter } from "react-router";

type Props = {
  order: any;
  match: any;
};

const SingleApproveOrder = (props: Props) => {
  const orderId = props.match.params.id;
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { nodeId: orderId }
  });
  const [onApproveOrder] = useMutation(APPROVE_ORDER, {
    variables: { nodeId: orderId }
  });

  if (loading || error) return null;

  const order: Order = data.order;

  return (
    <OrderSummaryWithActions order={order}>
      <Grid item md={6} xs={12}>
        <Button fullWidth variant="contained" color="secondary">
          Change Pickup time
        </Button>
      </Grid>
      <Grid item md={6} xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onApproveOrder()}
        >
          Accept Order
        </Button>
      </Grid>
    </OrderSummaryWithActions>
  );
};

export default withRouter(SingleApproveOrder);
