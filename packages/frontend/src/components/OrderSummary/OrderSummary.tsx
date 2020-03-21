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

const ListItemStyled = styled<any>(ListItem)`
  padding-bottom: 0;
  padding-top: 0;
`;

type Props = {
  pickUpCode: string;
  name: string;
  pickUpTime: string;
  bundleId: string;
  price: number;
};
export const OrderSummary = (props: Props) => {
  return (
    <List>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar>
            <ConfirmationNumberIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.pickUpCode} secondary="Code" />
      </ListItemStyled>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.name} secondary="Name" />
      </ListItemStyled>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar>
            <QueryBuilderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.pickUpTime} secondary="Pickup Time" />
      </ListItemStyled>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar>
            <InboxIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.bundleId} secondary="Bundle Number" />
      </ListItemStyled>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar>
            <EuroIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.price} secondary="Price" />
      </ListItemStyled>
    </List>
  );
};
