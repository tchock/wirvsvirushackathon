import * as React from "react";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import { Grid, Paper } from "@material-ui/core";
import styled from "styled-components";
import { getSpacing } from "../theme";
import { Order } from "../../../types/order";

const OrderCardWrapper = styled(Paper)`
  padding: ${getSpacing(2)}px;
  margin: ${getSpacing(2)}px 0;
  border-top: 2px solid ${props => props.theme.palette.primary.main};
`;

const ActionsGrid = styled(Grid)`
  margin-top: ${getSpacing(2)}px;
`;

type Props = {
  order: Order;
  isEditMode?: boolean;
};
export const OrderSummaryWithActions = ({
  children,
  ...props
}: { children: any } & Props) => {
  return (
    <OrderCardWrapper elevation={2}>
      <OrderSummary order={props.order} isEditMode={props.isEditMode} />
      <ActionsGrid container spacing={2}>
        {children}
      </ActionsGrid>
    </OrderCardWrapper>
  );
};
