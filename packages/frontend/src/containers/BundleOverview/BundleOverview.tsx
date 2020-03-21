import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FormattedNumber } from "react-intl";
import { ContentCard } from "../../components/ContentCard";
import { ContentCardHeader } from "../../components/ContentCardHeader";
import LocationIcon from "@material-ui/icons/PinDropOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import ItemsIcon from "@material-ui/icons/ReceiptOutlined";
import TypeIcon from "@material-ui/icons/LocalDiningOutlined";
import { IconListItem } from "../../components/IconListItem";
import { Box } from "@material-ui/core";

const { default: placeholderHeaderImage } = require("./placeholder_header.png");

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
      <ContentCardHeader src={placeholderHeaderImage} />
      <Typography variant="h5" paragraph>
        {bundleName}
      </Typography>
      <IconListItem icon={TypeIcon}>Vegan Food</IconListItem>
      <IconListItem icon={LocationIcon}>
        {location.name}
        <br />
        {location.street} {location.streetNumber}
      </IconListItem>
      <IconListItem icon={PeopleIcon}>For 2 People</IconListItem>

      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box flexGrow={1}>
          <IconListItem icon={ItemsIcon}>
            {products.map(({ name, quantity, unit }) => (
              <>
                {quantity}
                {unit} {name}
                <br />
              </>
            ))}
          </IconListItem>
        </Box>
        <Box mb={1}>
          <Typography variant="h5">
            <FormattedNumber value={price} style="currency" currency="EUR" />
          </Typography>
        </Box>
      </Box>

      <Box mt={1}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onAddToCart()}
        >
          Add to basket
        </Button>
      </Box>
    </ContentCard>
  );
}
