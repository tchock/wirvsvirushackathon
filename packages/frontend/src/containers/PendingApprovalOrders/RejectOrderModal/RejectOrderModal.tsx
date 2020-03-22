// @flow
import * as React from "react";
import { List, ListItem, ListItemText, Modal } from "@material-ui/core";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { useMutation } from "@apollo/react-hooks";
import { DENY_ORDER } from "../../../services/OrdersService";

type Props = {
  orderId: string;
  show: boolean;
  closeModal: () => void;
};

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

export const RejectOrderModal = (props: Props) => {
  const [onRejectOrder] = useMutation(DENY_ORDER);

  const onClickReject = () => {
    onRejectOrder({
      variables: {
        nodeId: props.orderId
      }
    }).then(() => {
      props.closeModal();
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.show}
        onClose={props.closeModal}
      >
        <ModalWrapper>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={onClickReject}>
                <ListItemText primary="We’re out of stock" />
              </ListItem>
              <ListItem button onClick={onClickReject}>
                <ListItemText primary="Too many orders at the moment" />
              </ListItem>
              <ListItem button onClick={onClickReject}>
                <ListItemText primary="No close date available" />
              </ListItem>
              <ListItem button onClick={onClickReject}>
                <ListItemText primary="Too many boxes" />
              </ListItem>
            </List>
          </Paper>
        </ModalWrapper>
      </Modal>
    </div>
  );
};
