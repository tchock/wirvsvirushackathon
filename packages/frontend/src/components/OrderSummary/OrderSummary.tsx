import * as React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import PersonIcon from "@material-ui/icons/Person";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import InboxIcon from "@material-ui/icons/Inbox";
import EuroIcon from "@material-ui/icons/Euro";
import styled from "styled-components";
import { Order } from "../../../../types/order";

const ListItemStyled = styled<any>(ListItem)`
  padding-bottom: 0;
  padding-top: 0;
`;

type Props = {
  order: Order;
};
export const OrderSummary = (props: Props) => {
  const totalPrice = props.order.bundles.nodes.reduce(
    (total, bundle) =>
      bundle.items.nodes.reduce(
        (bundleTotal, item) => bundleTotal + item.price,
        0
      ),
    0
  );
  return (
    <List>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar>
            <ConfirmationNumberIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.order.pickUpCode} secondary="Code" />
      </ListItemStyled>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.order.customer.nodeId} secondary="Name" />
      </ListItemStyled>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar>
            <QueryBuilderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            props.order.confirmedPickUpTime || props.order.requestedPickUpTime
          }
          secondary="Pickup Time"
        />
      </ListItemStyled>
      <ListItemStyled alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <InboxIcon />
          </Avatar>
        </ListItemAvatar>
        {props.order.bundles.nodes.map(bundle => {
          const bundleContents = bundle.items.nodes.map(item => (
            <>
              {item.quantity} {item.unit} {item.name} <br />
            </>
          ));
          return (
            <ListItemText primary={bundle.nodeId} secondary={bundleContents} />
          );
        })}
      </ListItemStyled>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar>
            <EuroIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={totalPrice} secondary="Price" />
      </ListItemStyled>
    </List>
  );
};
