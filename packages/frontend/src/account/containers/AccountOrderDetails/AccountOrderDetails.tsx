import React from "react";
import QRCode from "qrcode.react";
import { ContentCard } from "../../../components/ContentCard";
import { Typography, Box } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { GET_ORDER } from "../../../services/OrdersService";
import { CenteredProgress } from "../../../components/CenteredProgress";
import { DateListItem } from "../../../components/DateListItem";

export function AccountOrderDetails({ match: { params } }) {
  const { data, loading } = useQuery(GET_ORDER, {
    variables: {
      nodeId: params.orderId,
      audience: 'CUSTOMER',
    },
  });
  
  if (loading) {
    return <CenteredProgress />
  }
  
  const order = data.order;

  return (
    <ContentCard>
      <Typography variant="h5" paragraph>
        Order {order.pickUpCode}
      </Typography>
      <Box my={3} display="flex" justifyContent="center">
        <QRCode size={280} value={order.pickUpCode} />
      </Box>

      {getPickupDate(order)}
    </ContentCard>
  );
}

function getPickupDate(order) {
  const text = order.orderStatus === 'PENDING' ? 'Prefered pick up date' : 'Pick up date';
  const date = order.orderStatus === 'PENDING' ? order.requestedPickUpTime : order.confirmedPickUpTime;
  return <DateListItem text={text} date={date} />
}
