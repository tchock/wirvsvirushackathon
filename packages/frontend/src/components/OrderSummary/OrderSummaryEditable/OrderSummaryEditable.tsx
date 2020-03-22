import * as React from "react";
import { Typography, Grid, InputBase, Button } from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import styled from "styled-components";
import { Order } from "../../../../../types/order";
import { FormattedNumber } from "react-intl";
import { IconListItem } from "../../IconListItem";
import { getOrderTotalPrice } from "../../../utils";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import {
  BundleIconListItem,
  ListTitle,
  OrderSummaryWrapper,
  PriceGrid
} from "../OrderSummary";
import { PacketIcon } from "../../Icons/PacketIcon";
import { getSpacing } from "../../../theme";

const ButtonIcon = styled(Button)`
  padding: 0;
`;

const TimeDatePickerWrapper = styled.div`
  margin-top: -${getSpacing(.5)}px;

  *::before {
    content: none;
  }

  *::after {
    content: none;
  }
`;

type Props = {
  order: Order;
};
export const OrderSummaryEditable = (props: Props) => {
  const [order, setOrder] = React.useState(props.order);

  const totalPrice = getOrderTotalPrice(order);

  return (
    <OrderSummaryWrapper>
      <Typography paragraph variant="h5">
        Order# {order.nodeId}
      </Typography>
      <IconListItem icon={FingerprintIcon}>
        <Typography color="textSecondary">
          Client Id: {order.customer.nodeId}
        </Typography>
      </IconListItem>
      <ListTitle>
        <Typography color="textSecondary">Pick up date:</Typography>
      </ListTitle>
      <IconListItem icon={QueryBuilderIcon}>
        <TimeDatePickerWrapper>
          <KeyboardDatePicker
            margin="none"
            id="date-picker-dialog"
            label=""
            format="dd.MM.yyyy"
            value={new Date(order.requestedPickUpTime)}
            color="secondary"
            onChange={(event, date) => {
              console.log(event, date);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </TimeDatePickerWrapper>
      </IconListItem>
      <ListTitle>
        <Typography color="textSecondary">Pick up time:</Typography>
      </ListTitle>
      <IconListItem icon={QueryBuilderIcon}>
        <TimeDatePickerWrapper>
          <KeyboardTimePicker
            margin="none"
            id="time-picker"
            label=""
            value={new Date(order.requestedPickUpTime)}
            onChange={() => {}}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </TimeDatePickerWrapper>
      </IconListItem>
      <ListTitle>
        <Typography color="textSecondary">Boxes Includes:</Typography>
      </ListTitle>
      <Grid container>
        <Grid xs={6} item>
          {order.bundles.nodes.map(bundle =>
            bundle.items.nodes.map(item => (
              <BundleIconListItem icon={PacketIcon}>
                <Grid container>
                  <Grid item xs={11}>
                    {item.quantity} {item.unit} {item.name}
                  </Grid>
                  <Grid item xs={1}>
                    <ButtonIcon onClick={() => console.log("asdasd")}>
                      <HighlightOffOutlinedIcon color="secondary" />
                    </ButtonIcon>
                  </Grid>
                </Grid>
              </BundleIconListItem>
            ))
          )}
        </Grid>
        <PriceGrid xs={6} item>
          <Typography variant="h5">
            <FormattedNumber
              value={totalPrice}
              style="currency"
              currency="EUR"
            />
          </Typography>
        </PriceGrid>
      </Grid>
    </OrderSummaryWrapper>
  );
};
