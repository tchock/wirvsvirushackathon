import * as React from "react";
import { Typography, Grid } from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import styled from "styled-components";
import { Order } from "../../../../../types/order";
import { getSpacing } from "../../../theme";
import { FormattedNumber } from "react-intl";
import { IconListItem } from "../../IconListItem";
import { getOrderTotalPrice } from "../../../utils";

const OrderSummaryWrapper = styled.div``;

const PriceGrid = styled(Grid)`
  margin-top: auto;
  margin-right: auto;
  text-align: right;
`;

const ListTitle = styled.div`
  padding-left: ${getSpacing(4)}px;
`;

type Props = {
  order: Order;
};
export const OrderSummaryEditable = (props: Props) => {
  const totalPrice = getOrderTotalPrice(props.order);

  return (
    <OrderSummaryWrapper>
      <Typography paragraph variant="h5">
        Order# {props.order.pickUpCode}
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
          {props.order.bundles.nodes.map(bundle =>
            bundle.items.nodes.map(item => (
              <IconListItem icon={QueryBuilderIcon}>
                {item.quantity} {item.unit} {item.name}
              </IconListItem>
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
