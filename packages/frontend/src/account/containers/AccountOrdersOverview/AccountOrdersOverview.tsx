import React from "react";
import { Typography, Button } from "@material-ui/core";
import { ButtonRow } from "../../../components/ButtonRow";
import { ContentCard } from "../../../components/ContentCard";

const fakeOrders = [
  {
    pickUpCode: "1234",
    orderStatus: "PENDING"
  },
  {
    pickUpCode: "Abc123",
    orderStatus: "ACCEPTED"
  },
  {
    pickUpCode: "xxx",
    orderStatus: "REJECTED"
  }
];

export function AccountOrdersOverview() {
  return (
    <>
      {fakeOrders.map(fakeOrder => (
        <OrderItem key={fakeOrder.pickUpCode} order={fakeOrder} />
      ))}
    </>
  );
}

function OrderItem({ order }) {
  return (
    <ContentCard>
      <Typography variant="h5">Order: {order.pickUpCode}</Typography>
      {getOrderItemContent(order)}
    </ContentCard>
  );
}

function getOrderItemContent(order) {
  switch (order.orderStatus) {
    case "ACCEPTED":
      return <OrderStatusAccepted />;
    case "REJECTED":
      return <OrderStatusRejected />;
    default:
      return <OrderStatusPending />;
  }
}

function OrderStatusPending() {
  return <Typography>Still pending</Typography>;
}

function OrderStatusAccepted() {
  return (
    <>
      <Typography>The shop accepted your order</Typography>
      <Typography>Payment methods:</Typography>
      <Typography>Paypal</Typography>
      <Typography>Cash</Typography>
      <ButtonRow>
        <Button variant="contained" color="primary">
          Pick up now
        </Button>
      </ButtonRow>
    </>
  );
}

function OrderStatusRejected() {
  return (
    <>
      <Typography>We&apos;re sorry, your order has been denied</Typography>
      <Typography>Reason: Out of products, too many orders</Typography>
    </>
  );
}
