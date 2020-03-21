import React from "react";
import { ContentCard } from "../../../components/ContentCard";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { FormattedNumber } from "react-intl";
import { Button } from "@material-ui/core";

export function Basket() {
  return (
    <>
      <BundleItem
        name="Super Bundle"
        products={[
          { name: "Bananas", quantity: 5, price: 2 },
          { name: "Apples", quantity: 8, price: 2 },
          { name: "Pineapple", quantity: 1, price: 3 }
        ]}
      />
      <LocationBox
        location={{
          name: "Rewe",
          street: "Rewestraße",
          streetNumber: "12a",
          zipCode: 12345,
          city: "Berlin"
        }}
      />
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
