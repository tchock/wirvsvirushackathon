import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';

export const typeDefs = gql`
  extend type Query {
    basketItems: [String]
    selectedShopId: String
  }
`;

export type ResolverFn = (
  parent: any, 
  args: any, 
  { cache } : { cache: ApolloCache<any> }
) => any;

export const resolvers = {};
