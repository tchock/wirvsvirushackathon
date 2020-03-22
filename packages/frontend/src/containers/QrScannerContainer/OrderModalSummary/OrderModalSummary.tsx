import * as React from "react";
import {
  GET_ORDER_BY_QR_CODE,
  PICK_UP_ORDER
} from "../../../services/OrdersService";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Grid, Modal } from "@material-ui/core";
import { Order } from "../../../../../types/order";
import styled from "styled-components";
import { OrderSummaryWithActions } from "../../../hoc/OrderSummaryWithActions";

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
  padding: 16px;
`;

const ModalStyled = styled(Modal)`
  overflow: auto;
`;

type Props = {
  qrCode: string;
  setQrCode: () => void;
  show: boolean;
  setShowModal: (show: boolean) => void;
};
export const OrderModalSummary = (props: Props) => {
  console.log(props.qrCode);
  const { loading, error, data } = useQuery(GET_ORDER_BY_QR_CODE, {
    variables: { pickUpCode: props.qrCode }
  });

  const [onPickUpOrder] = useMutation(PICK_UP_ORDER);

  if (loading || error) return null;

  const order: Order = data.orderByPickUpCode;

  return (
    <ModalStyled
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.show}
      onClose={() => props.setShowModal(false)}
    >
      <ModalWrapper>
        <OrderSummaryWithActions order={order}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                onPickUpOrder({
                  variables: { pickUpCode: order.pickUpCode }
                }).then(() => {
                  props.setShowModal(false);
                  props.setQrCode("");
                });
              }}
            >
              Pickup
            </Button>
          </Grid>
        </OrderSummaryWithActions>
      </ModalWrapper>
    </ModalStyled>
  );
};
