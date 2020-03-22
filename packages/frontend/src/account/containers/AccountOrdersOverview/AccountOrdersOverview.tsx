import React from "react";
import { Typography, Button, Box } from "@material-ui/core";
import { ContentCard } from "../../../components/ContentCard";
import { useQuery } from "@apollo/react-hooks";
import { GET_CUSTOMER_ORDERS } from "../../../services/OrdersService";
import { CenteredProgress } from "../../../components/CenteredProgress";
import { FormattedNumber } from "react-intl";
import { DateListItem } from "../../../components/DateListItem";
import { Link } from "react-router-dom";

export function AccountOrdersOverview() {
  const { data, loading } = useQuery(GET_CUSTOMER_ORDERS);
  if (loading) {
    return <CenteredProgress />
  }

  const orders = data.orders.nodes;

  return (
    <>
      {orders.map(order => (
        <OrderItem key={order.pickUpCode} order={order} />
      ))}
    </>
  );
}

function OrderItem({ order }) {
  const price = getOrderPrice(order);
  return (
    <ContentCard footer={<Box mt={-2}>
      {getActionButton(order)}
    </Box>}>
      <Typography variant="h5" paragraph>Order {order.pickUpCode}</Typography>
      <Box display="flex" justifyContent="space-between">
        <Box flexGrow={1}>
          {getPickupDate(order)}
        </Box>
        <Typography variant="h5">
          <FormattedNumber value={price} style="currency" currency="EUR" />
        </Typography>
      </Box>
    </ContentCard>
  );
}

function getActionButton(order) {
  return (
    <Button
      disableElevation
      component={Link}
      to={`/account/order/${order.nodeId}`}
      size="large"
      variant="contained"
      color={getStatusColor(order)}
      fullWidth
    >
      {getStatusText(order)}
    </Button>
  )
}

function getStatusText(order) {
  switch(order.orderStatus) {
    case 'PENDING':
      return 'To be accepted';
    case 'REJECTED':
      return 'Rejected';
    case 'ACCEPTED':
      return 'Order accepted';
    default:
      return order.orderStatus;
  }
}

function getStatusColor(order) {
  switch(order.orderStatus) {
    case 'PENDING':
      case 'REJECTED':
      return 'secondary';
    default:
      return 'primary';
  }
}

function getOrderPrice(order) {
  return order.bundles.nodes
    .reduce((bundleAcc, bundle) => bundle.items.nodes
      .reduce((itemAcc, item) => itemAcc + item.price, bundleAcc), 0);
}

function getPickupDate(order) {
  const text = order.orderStatus === 'PENDING' ? 'Prefered pick up date' : 'Pick up date';
  const date = order.orderStatus === 'PENDING' ? order.requestedPickUpTime : order.confirmedPickUpTime;
  return <DateListItem text={text} date={date} />
}
