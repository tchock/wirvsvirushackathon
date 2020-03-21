import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FormattedNumber } from "react-intl";
import { ButtonRow } from "../../components/ButtonRow";
import { ContentCard } from "../../components/ContentCard";

export function BundleOverview() {
  return (
    <>
      <BundleItem
        name="Super Bundle"
        products={[
          { name: "Bananas", quantity: 5, price: 2 },
          { name: "Apples", quantity: 8, price: 2 },
          { name: "Pineapple", quantity: 1, price: 3 }
        ]}
        location={{
          name: "Rewe",
          street: "Rewestraße",
          streetNumber: "12a",
          zipCode: 12345,
          city: "Berlin"
        }}
        onAddToCart={() => console.log("added to cart")}
      />
      <BundleItem
        name="MEGA Bundle"
        products={[
          { name: "Dark bread", quantity: 1, price: 1.5 },
          { name: "Marmelade", quantity: 1, price: 1.2 },
          { name: "Cheese", unit: "g", quantity: 200, price: 2.2 }
        ]}
        location={{
          name: "Rewe",
          street: "Rewestraße",
          streetNumber: "12a",
          zipCode: 12345,
          city: "Berlin"
        }}
        onAddToCart={() => console.log("added to cart")}
      />
    </>
  );
}

function BundleItem({ name: bundleName, products, location, onAddToCart }) {
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
      <Typography variant="h6">Location</Typography>
      <Typography>{location.name}</Typography>
      <Typography>
        {location.street} {location.number}
      </Typography>
      <Typography>
        {location.zipCode} {location.city}
      </Typography>

      <ButtonRow>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAddToCart()}
        >
          Add to cart
        </Button>
      </ButtonRow>
    </ContentCard>
  );
}
