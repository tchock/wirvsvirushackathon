import * as React from "react";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import { Grid, Paper } from "@material-ui/core";
import styled from "styled-components";
import { getSpacing } from "../theme";

const OrderCardWrapper = styled(Paper)`
  padding: ${getSpacing(1)} 0 ${getSpacing(4)} 0;
`;

const ActionsGrid = styled(Grid)`
  padding: 0 ${getSpacing(2)};
`;

type Props = {
  order: any;
  children: any;
};
export const OrderSummaryWithActions = (props: Props) => {
  return (
    <OrderCardWrapper elevation={0}>
      <OrderSummary {...props.order} />
      <ActionsGrid container spacing={2}>
        {props.children}
      </ActionsGrid>
    </OrderCardWrapper>
  );
};
