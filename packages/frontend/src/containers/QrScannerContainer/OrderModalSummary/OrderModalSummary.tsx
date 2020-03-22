import * as React from "react";
import { GET_ORDER_BY_QR_CODE } from "../../../services/OrdersService";
import { useQuery } from "@apollo/react-hooks";
import { Button, Grid, Modal } from "@material-ui/core";
import { Order } from "../../../../../types/order";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
  padding: 16px;
`;

const SummaryWrapper = styled(Paper)`
  width: 100%;
  padding: 16px;
`;

type Props = {
  qrCode: string;
};
export const OrderModalSummary = (props: Props) => {
  const { loading, error, data } = useQuery(GET_ORDER_BY_QR_CODE, {
    variables: { pickUpCode: props.qrCode }
  });

  if (loading || error) return null;

  const order: Order = data.order;

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={true}
      onClose={() => {}}
    >
      <ModalWrapper>
        <SummaryWrapper>
          <OrderSummaryWithActions order={order}>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary">
                Pickup
              </Button>
            </Grid>
          </OrderSummaryWithActions>
        </SummaryWrapper>
      </ModalWrapper>
    </Modal>
  );
};
