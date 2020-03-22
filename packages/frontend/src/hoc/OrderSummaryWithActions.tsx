import * as React from "react";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import { Grid, Paper } from "@material-ui/core";
import styled from "styled-components";
import { getSpacing } from "../theme";
import { Order } from "../../../types/order";

const OrderCardWrapper = styled(Paper)`
  padding: ${getSpacing(1)}px 0 ${getSpacing(4)}px 0;
  margin: ${getSpacing(2)}px 0;
`;

const ActionsGrid = styled(Grid)`
  padding: 0 ${getSpacing(2)}px;
`;

type Props = {
  order: Order;
};
export const OrderSummaryWithActions = ({
  children,
  ...props
}: { children: any } & Props) => {
  return (
    <OrderCardWrapper elevation={0}>
      <OrderSummary order={props.order} />
      <ActionsGrid container spacing={2}>
        {children}
      </ActionsGrid>
    </OrderCardWrapper>
  );
};
