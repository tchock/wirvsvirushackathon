import React from "react";
import { ContentCard } from "../../../components/ContentCard";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { FormattedNumber } from "react-intl";
import { Button } from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_BASKET } from "../../../queries";
import { PLACE_ORDER } from '../../../services/OrdersService';
import { bundles } from "../../../data";
import { ButtonRow } from "../../../components/ButtonRow";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import AlertIcon from "@material-ui/icons/ErrorOutlined";
import { Message } from "../../../components/Message";
import { IconListItem } from "../../../components/IconListItem";

export function Basket() {
  const { data: BasketData, client } = useQuery<any>(GET_BASKET);
  const [placeOrder] = useMutation(PLACE_ORDER);
  const basketItems: any[] = BasketData?.basketItems || [];

  const selectedBundles = bundles.filter(bundle => basketItems.includes(bundle.nodeId));

  if (!selectedBundles.length) {
    return <Box m={1}>
      <Message title="Your Basket is empty" message="Please select a bundle" />
    </Box>;
  }

  return (
    <>
      {selectedBundles.map(bundle => (
        <BasketItem
          name={bundle.name}
          products={bundle.items}
          onRemove={() => removeFromBasket(bundle)}
        />
      ))}
      {selectedBundles.length && <LocationBox
        location={selectedBundles[0].location}
      />}
      <Box mx={1}>
        <Button fullWidth variant="contained" color="primary" onClick={handleOrder}>
          Order now
        </Button>
      </Box>
    </>
  );

  function handleOrder() {
    const inputBundles = selectedBundles.map(bundle => ({
      nodeId: bundle.nodeId,
      items: bundle.items,
    }))
    placeOrder({ variables: { orderInput: {
      bundles: inputBundles,
      store: "c3RvcmVJZA==",
      requestedPickUpTime: (new Date()).toISOString(),
    } } }).then(() => {
      clearBasket();
    });
  }

  function removeFromBasket(bundle) {
    const removalIndex = basketItems.findIndex(nodeId => bundle.nodeId === nodeId);
    if (removalIndex === -1) {
      return;
    }

    const newBasketItems = [...basketItems.slice(0, removalIndex), ...basketItems.slice(removalIndex + 1)];
    
    const data = {
      basketItems: newBasketItems,
      selectedShopId: newBasketItems.length ? bundle.location.nodeId : undefined,
    };
    
    client.writeData({ data })
  }

  function clearBasket() {
    client.writeData({ 
      data: {
        basketItems: [],
        selectedShopId: undefined,
      }
    });
  }
}

function BasketItem({ name: bundleName, products, onRemove }) {
  const price = products.reduce((acc, product) => acc + product.price, 0);
  return (
    <ContentCard>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" paragraph>
          {bundleName}
        </Typography>
        <Typography variant="h5">
          <FormattedNumber value={price} style="currency" currency="EUR" />
        </Typography>
      </Box>

      <IconListItem icon={AlertIcon}>
        This is not a final order! You&apos;ll recieve a mail
        from the shop owner if the bundle is ready for you.
      </IconListItem>

      <ButtonRow>
        <Button color="secondary" onClick={() => onRemove()} startIcon={<DeleteIcon />}>
          Remove
        </Button>
      </ButtonRow>
    </ContentCard>
  );
}

function LocationBox({ location }) {
  return (
    <ContentCard>
      <Typography variant="h6">Location</Typography>
      <Typography>{location.name}</Typography>
      <Typography>
        {location.street} {location.streetNumber}
      </Typography>
      <Typography>
        {location.zipCode} {location.city}
      </Typography>
    </ContentCard>
  );
}
