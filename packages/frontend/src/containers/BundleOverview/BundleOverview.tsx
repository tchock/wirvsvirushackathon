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
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const { default: placeholderHeaderImage } = require("./placeholder_header.png");

const GET_BASKET = gql`
  query getBasket {
    basketItems @client
    selectedShopId @client
  }
`;

export function BundleOverview() {
  const bundles = [
    {
      nodeId: '123',
      peopleCount: 4,
      name: 'Pasta Dinner',
      category: 'Pasta',
      items: [
        { name: "Onions", unit: "g", quantity: 500, price: 1.2 },
        { name: "Chopped Tomatoes", unit: "g", quantity: 425, price: 0.5 },
        { name: "Tomato Puree", unit: "g", quantity: 45, price: 1.0 },
        { name: "Spaghetti", unit: "g", quantity: 500, price: 0.75 }, 
      ],
      location: {
        nodeId: 123,
        name: "Rewe",
        street: "Rewestraße",
        streetNumber: "12a",
        zipCode: 12345,
        city: "Berlin"
      },
    },
    {
      nodeId: '321',
      name: 'Vegan Box',
      category: 'Vegan Food',
      peopleCount: 2,
      items: [
        { name: "Soy Milk", unit: "l", quantity: 1, price: 1.0 },
        { name: "Basmati Rice", unit: "g", quantity: 500, price: 0.75 },
        { name: "Red Curry Paste", unit: "g", quantity: 320, price: 2.2 },
        { name: "Carrots", unit: "kg", quantity: 1, price: 1.0 },
        { name: "Chopped Tomatoes", unit: "g", quantity: 425, price: 0.5 },
        { name: "Onions", unit: "g", quantity: 500, price: 1.2 },
      ],
      location: {
        nodeId: 123,
        name: "Rewe",
        street: "Rewestraße",
        streetNumber: "12a",
        zipCode: 12345,
        city: "Berlin"
      },
    },
    {
      nodeId: '999',
      name: 'Burgers & Chips',
      category: 'Meat',
      peopleCount: 4,
      items: [
        { name: "Oven Chips", unit: "kg", quantity: 1, price: 1.0 },
        { name: "Burger Patties", quantity: 4, price: 2.5 },
        { name: "Burger Buns", quantity: 4, price: 1.0 },
        { name: "Tomatoes", quantity: 2, price: 0.5 },
        { name: "Onions", quantity: 2, price: 0.25 },
        { name: "Ketchup", unit: "g", quantity: 350, price: 0.25 },
      ],
      location: {
        nodeId: 123,
        name: "Rewe",
        street: "Rewestraße",
        streetNumber: "12a",
        zipCode: 12345,
        city: "Berlin"
      },
    },
    {
      nodeId: '33333',
      name: 'Fresh dairy box',
      category: 'Milk',
      peopleCount: 3,
      items: [
        { name: "Fresh Milk", unit: "l", quantity: 2, price: 1.0 },
        { name: "500ml strawberry joghurt", quantity: 2, price: 1.0 },
        { name: "Butter", unit: "g", quantity: 250, price: 2.2 },
        { name: "Vanilla Ice Cream", unit: "ml", quantity: 500, price: 2.2 },
      ],
      location: {
        nodeId: 321,
        name: "Rewe",
        street: "Rewestraße",
        streetNumber: "12a",
        zipCode: 12345,
        city: "Berlin"
      },
    },
    {
      nodeId: '1111',
      name: 'Non-food family pack',
      category: 'Non-Food',
      peopleCount: 4,
      items: [
        { name: "bag of liquid soap", unig: "ml", quantity: 750, price: 2.75 },
        { name: "Tube Toothpaste", quantity: 1, price: 0.75 },
        { name: "toothbrushes", quantity: 2, price: 0.5 },
        { name: "liquid detergent", unit: "l", quantity: 2.5, price: 1.5 },
        { name: "Bag of Toilet Paper (yes, we have some)", quantity: 1, price: 2.5 },
      ],
      location: {
        nodeId: 321,
        name: "Rewe",
        street: "Rewestraße",
        streetNumber: "12a",
        zipCode: 12345,
        city: "Berlin"
      },
    },
    {
      nodeId: '999999',
      name: 'Breakfast for one week',
      category: 'Breakfast',
      peopleCount: 2,
      items: [
        { name: "cereals with raisins and nuts", unig: "kg", quantity: 1, price: 2.25 },
        { name: "long life milk", unig: "l", quantity: 1, price: 0.75 },
        { name: "Cherry Jam", unig: "ml", quantity: 325, price: 1.50 },
        { name: "Sliced Rye Bread", unig: "g", quantity: 500, price: 2.50 },
        { name: "Nutella", quantity: 1, price: 1.50 },
        { name: "Packages of Toast", quantity: 2, price: 1.75 },
      ],
      location: {
        nodeId: 321,
        name: "Rewe",
        street: "Rewestraße",
        streetNumber: "12a",
        zipCode: 12345,
        city: "Berlin"
      },
    },
  ];

  const { data, client } = useQuery<any>(GET_BASKET);
  
  const basket = data?.basketItems ?? [];
  const selectedShopId = data?.selectedShopId;

  const renderBundles = basket.length ? bundles
    .filter(bundle => bundle.location.nodeId === selectedShopId)
    .filter(bundle => !basket.find((basketNodeId) => basketNodeId === bundle.nodeId))
    : bundles;

  return (
    <>
      {renderBundles.map(bundle => (
        <BundleItem
          key={bundle.nodeId}
          name={bundle.name}
          peopleCount={bundle.peopleCount}
          category={bundle.category}
          products={bundle.items}
          location={bundle.location}
          onAddToCart={() => addToBasket(bundle)}
        />
      ))}
    </>
  );

  function addToBasket(bundle) {
    const data = { 
      basketItems: [...basket, bundle.nodeId],
      selectedShopId: bundle.location.nodeId,
    };
    
    client.writeData({ data })
  }
}

function BundleItem({ name: bundleName, products, location, peopleCount, category, onAddToCart }) {
  const price = products.reduce((acc, product) => acc + product.price, 0);
  return (
    <ContentCard>
      <ContentCardHeader src={placeholderHeaderImage} />
      <Typography variant="h5" paragraph>
        {bundleName}
      </Typography>
      <IconListItem icon={TypeIcon}>{category}</IconListItem>
      <IconListItem icon={LocationIcon}>
        {location.name}
        <br />
        {location.street} {location.streetNumber}
      </IconListItem>
      <IconListItem icon={PeopleIcon}>For {peopleCount} People</IconListItem>

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
