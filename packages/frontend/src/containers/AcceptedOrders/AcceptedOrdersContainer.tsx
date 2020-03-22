import * as React from "react";
import { SingleAcceptedOrder } from "./SingleAcceptedOrder/SingleAcceptedOrder";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_ACCEPTED_ORDERS,
  PICK_UP_ORDER
} from "../../services/OrdersService";
import { Order } from "../../../../types/order";
import { withRouter } from "react-router";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

type Props = {
  history: any;
};

const AcceptedOrdersContainer = (props: Props) => {
  const { loading, error, data, refetch } = useQuery(GET_ACCEPTED_ORDERS);
  const [onPickUpOrder] = useMutation(PICK_UP_ORDER);
  const [showAlert, setShowAlert] = React.useState(false);

  if (loading || error) return null;

  const orders: Order[] = data.orders.nodes;

  return (
    <>
      {orders.map(order => (
        <SingleAcceptedOrder
          order={order}
          key={order.nodeId}
          onPickedUpConfirmed={() => {
            onPickUpOrder({
              variables: {
                pickUpCode: order.pickUpCode
              }
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
          This is a success message!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default withRouter(AcceptedOrdersContainer);
