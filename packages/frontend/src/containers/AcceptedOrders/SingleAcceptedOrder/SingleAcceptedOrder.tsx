import * as React from "react";
import styled from "styled-components";
import { Button, Grid, Paper } from "@material-ui/core";
import { getSpacing } from "../../../theme";
import { OrderSummary } from "../../../components/OrderSummary/OrderSummary";

const AcceptedOrderWrapper = styled(Paper)`
  padding: ${getSpacing(1)} 0 ${getSpacing(4)} 0;
`;

const ActionsGrid = styled(Grid)`
  padding: 0 ${getSpacing(2)};
`;

type Props = {
  order: any;
  onPaidConfirmed: () => void;
  onPickedUpConfirmed: () => void;
};
export const SingleAcceptedOrder = (props: Props) => {
  return (
    <AcceptedOrderWrapper elevation={0}>
      <OrderSummary {...props.order} />
      <ActionsGrid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={props.onPaidConfirmed}
          >
            Paid
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.onPickedUpConfirmed}
          >
            Picked-up
          </Button>
        </Grid>
      </ActionsGrid>
    </AcceptedOrderWrapper>
  );
};
