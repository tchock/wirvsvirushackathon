import * as React from "react";
import { SingleAcceptedOrder } from "./SingleAcceptedOrder/SingleAcceptedOrder";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_ACCEPTED_ORDERS,
  PICK_UP_ORDER
} from "../../services/OrdersService";
import { Order } from "../../../../types/order";
import { withRouter } from "react-router";

type Props = {
  history: any;
};
// /admin/pickup/:id
const AcceptedOrdersContainer = (props: Props) => {
  const { loading, error, data } = useQuery(GET_ACCEPTED_ORDERS);
  const [onPickUpOrder] = useMutation(PICK_UP_ORDER);

  // onPickUpOrder({
  //   variables: { pickUpCode: order.pickUpCode }
  // })

  if (loading || error) return null;

  const orders: Order[] = data.orders.nodes;

  return orders.map(order => (
    <SingleAcceptedOrder
      order={order}
      onPickedUpConfirmed={() =>
        props.history.push(`/admin/pickup/${order.nodeId}`)
      }
    />
  ));
};

export default withRouter(AcceptedOrdersContainer);
