import * as React from "react";
import { SinglePendingOrder } from "./SinglePendingOrder/SinglePendingOrder";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Order } from "../../../../types/order";
import {
  APPROVE_ORDER,
  GET_PENDING_ORDERS
} from "../../services/OrdersService";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

type Props = {};

export const PendingApprovalOrdersContainer = (props: Props) => {
  const { loading, error, data, refetch } = useQuery(GET_PENDING_ORDERS);
  const [onApproveOrder] = useMutation(APPROVE_ORDER);
  const [showAlert, setShowAlert] = React.useState(false);

  if (loading) return null;

  const orders: Order[] = data.orders.nodes;

  return (
    <>
      {orders.map(order => (
        <SinglePendingOrder
          order={order}
          key={order.nodeId}
          onApproveOrder={() => {
            onApproveOrder({
              variables: { nodeId: order.nodeId }
            }).then(() => {
              refetch();
              setShowAlert(true);
            });
          }}
        />
      ))}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        onClose={() => setShowAlert(false)}
      >
        <MuiAlert onClose={() => setShowAlert(false)} severity="success">
          The order has been accepted!
        </MuiAlert>
      </Snackbar>
    </>
  );
};
