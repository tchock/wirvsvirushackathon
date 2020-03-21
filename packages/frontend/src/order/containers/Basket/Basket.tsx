import React from "react";
import { ContentCard } from "../../../components/ContentCard";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { FormattedNumber } from "react-intl";
import { Button } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { GET_BASKET } from "../../../queries";
import { bundles } from "../../../data";

export function Basket() {
  const { data: BasketData } = useQuery<any>(GET_BASKET);
  const basketItems = BasketData?.basketItems || [];

  const visibleBundles = bundles.filter(bundle => basketItems.includes(bundle.nodeId));
  return (
    <>
      {visibleBundles.map(bundle => (
        <BundleItem
          name={bundle.name}
          products={bundle.items}
        />
      ))}
      {visibleBundles.length && <LocationBox
        location={visibleBundles[0].location}
      />}
      <Box>
        <Button fullWidth variant="contained" color="primary">
          Order now
        </Button>
      </Box>
    </>
  );
}

function BundleItem({ name: bundleName, products }) {
  const price = products.reduce((acc, product) => acc + product.price, 0);
  return (
    <ContentCard>
      <Typography variant="h5" paragraph>
        {bundleName}
      </Typography>
      <Typography>Contains:</Typography>
      {products.map(({ name, quantity, unit }) => (
        <Typography>
          {quantity}
          {unit} {name}
        </Typography>
      ))}

      <Typography>
        Price <FormattedNumber value={price} currency="EUR" />
      </Typography>
    </ContentCard>
  );
}

function LocationBox({ location }) {
  return (
    <ContentCard>
      <Typography variant="h6">Location</Typography>
      <Typography>{location.name}</Typography>
      <Typography>
        {location.street} {location.number}
      </Typography>
      <Typography>
        {location.zipCode} {location.city}
      </Typography>
    </ContentCard>
  );
}
