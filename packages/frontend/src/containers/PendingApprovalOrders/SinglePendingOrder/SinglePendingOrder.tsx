import * as React from "react";
import styled from "styled-components";
import { Button, Grid, Paper } from "@material-ui/core";
import { getSpacing } from "../../../theme";
import { OrderSummary } from "../../../components/OrderSummary/OrderSummary";
import { Link } from "react-router-dom";

const PendingOrderWrapper = styled(Paper)`
  padding: ${getSpacing(1)} 0 ${getSpacing(4)} 0;
`;

const ActionsGrid = styled(Grid)`
  padding: 0 ${getSpacing(2)};
`;

type Props = {
  order: any;
};
export const SinglePendingOrder = (props: Props) => {
  return (
    <PendingOrderWrapper elevation={0}>
      <OrderSummary {...props.order} />
      <ActionsGrid container spacing={2}>
        <Grid item xs={6}>
          <Link
            to="/admin/pending/1/accept"
            fullWidth
            variant="contained"
            color="primary"
            component={Button}
          >
            Accept Order
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link
            to="/admin/pending/1/deny"
            fullWidth
            variant="contained"
            color="secondary"
            component={Button}
          >
            Deny Order
          </Link>
        </Grid>
      </ActionsGrid>
    </PendingOrderWrapper>
  );
};
