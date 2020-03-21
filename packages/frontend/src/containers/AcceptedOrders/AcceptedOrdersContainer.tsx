import * as React from "react";
import { SingleAcceptedOrder } from "./SingleAcceptedOrder/SingleAcceptedOrder";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { TopNavigation } from "../../components/TopAdminNavigation/TopAdminNavigation";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_ACCEPTED_ORDERS,
  PICK_UP_ORDER
} from "../../services/OrdersService";
import { Order } from "../../../../types/order";

type Props = {};

const onPaidConfirmed = () => {
  console.log("paid");
};

export const AcceptedOrdersContainer = (props: Props) => {
  const { loading, error, data } = useQuery(GET_ACCEPTED_ORDERS);
  const [onPickUpOrder] = useMutation(PICK_UP_ORDER);

  if (loading) return null;

  const orders: Order[] = data.orders.nodes;

  return (
    <>
      <TopNavigation>
        <Link
          to="/admin/pending"
          component={Button}
          fullWidth={true}
          variant="contained"
          color="default"
        >
          Pending Approval Orders
        </Link>
      </TopNavigation>
      {orders.map(order => (
        <SingleAcceptedOrder
          order={order}
          onPaidConfirmed={onPaidConfirmed}
          onPickedUpConfirmed={() =>
            onPickUpOrder({
              variables: { pickUpCode: order.pickUpCode }
            })
          }
        />
      ))}
    </>
  );
};
