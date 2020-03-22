import * as React from "react";
import { Typography, Grid } from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import styled from "styled-components";
import { Order } from "../../../../types/order";
import { getSpacing } from "../../theme";
import { FormattedNumber } from "react-intl";
import { IconListItem } from "../IconListItem";
import { OrderSummaryEditable } from "./OrderSummaryEditable/OrderSummaryEditable";
import { getOrderTotalPrice } from "../../utils";
import { PacketIcon } from "../Icons/PacketIcon";

export const OrderSummaryWrapper = styled.div``;

export const PriceGrid = styled(Grid)`
  margin-top: auto;
  margin-right: auto;
  text-align: right;
`;

export const ListTitle = styled.div`
  padding-left: ${getSpacing(4)}px;
`;

export const BundleIconListItem = styled(IconListItem)`
  margin-bottom: 0;
`;

type Props = {
  order: Order;
  isEditMode?: boolean;
};
export const OrderSummary = (props: Props) => {
  const totalPrice = getOrderTotalPrice(props.order);

  return props.isEditMode ? (
    <OrderSummaryEditable order={props.order} />
  ) : (
    <OrderSummaryWrapper>
      <Typography paragraph variant="h5">
        Order# {props.order.nodeId.slice(-8)}
      </Typography>
      <ListTitle>
        <Typography color="textSecondary">Pick up date:</Typography>
      </ListTitle>
      <IconListItem icon={QueryBuilderIcon}>
        {props.order.confirmedPickUpTime || props.order.requestedPickUpTime}
      </IconListItem>
      <ListTitle>
        <Typography color="textSecondary">Boxes Includes:</Typography>
      </ListTitle>
      <Grid container>
        <Grid xs={6} item>
          {props.order.bundles.nodes.map((bundle) =>
            bundle.items.nodes.map(item => (
              <BundleIconListItem icon={PacketIcon}>
                {item.quantity} {item.unit} {item.name}
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
