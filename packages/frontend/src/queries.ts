import { gql } from "apollo-boost";

export const GET_BASKET = gql`
  query getBasket {
    basketItems @client
    selectedShopId @client
  }
`;
