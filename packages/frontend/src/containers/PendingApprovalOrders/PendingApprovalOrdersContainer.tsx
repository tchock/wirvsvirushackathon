import * as React from "react";
import { SinglePendingOrder } from "./SinglePendingOrder/SinglePendingOrder";
import { useQuery } from "@apollo/react-hooks";
import { Order } from "../../../../types/order";
import { GET_ACCEPTED_ORDERS } from "../../services/OrdersService";

type Props = {};

export const PendingApprovalOrdersContainer = (props: Props) => {
  const { loading, error, data } = useQuery(GET_ACCEPTED_ORDERS);
  if (loading) return null;

  const orders: Order[] = data.orders.nodes;

  return orders.map(order => <SinglePendingOrder order={order} />);
};
