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
import { Box, Tabs, Tab } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { bundles } from "../../data";
import { GET_BASKET } from "../../queries";

export function BundleOverview() {
  const { data, client } = useQuery<any>(GET_BASKET);
  const [selectedFilter, setSelectedFilter] = React.useState('all');
  
  const basket = data?.basketItems ?? [];
  const selectedShopId = data?.selectedShopId;

  const filterBundles = selectedFilter === 'all' ? bundles : bundles
    .filter(bundle => bundle.filterCategory === selectedFilter);
  
  const renderBundles = basket.length ? filterBundles
    .filter(bundle => bundle.location.nodeId === selectedShopId)
    .filter(bundle => !basket.find((basketNodeId) => basketNodeId === bundle.nodeId))
    : filterBundles;  

  return (
    <>
     <Box mb={2} bgcolor="background.paper">
      <Tabs value={selectedFilter} onChange={(_, newValue) => setSelectedFilter(newValue)} variant="fullWidth">
        <Tab value="all" label="All" />
        <Tab value="food" label="Food" />
        <Tab value="non-food" label="Non Food" />
      </Tabs>
     </Box>
      {renderBundles.map(bundle => (
        <BundleItem
          key={bundle.nodeId}
          name={bundle.name}
          bannerImage={bundle.banner}
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

function BundleItem({ name: bundleName, bannerImage, products, location, peopleCount, category, onAddToCart }) {
  const price = products.reduce((acc, product) => acc + product.price, 0);
  return (
    <ContentCard header={<ContentCardHeader src={bannerImage} />}>
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
