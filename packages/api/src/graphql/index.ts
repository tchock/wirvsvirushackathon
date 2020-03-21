import { makeExecutableSchema } from 'apollo-server-lambda';
import { asPaginationResolver } from './pagination';
import Order from '../Orders';
import NodeId from './nodeId';

const typeDef = /* GraphQL */ `
  type Query {
    orders(audience: Audiences!): OrderList
    order(nodeId: NodeId!): Order
  }

  type Mutation {
    orderPickUp(pickUpCode: String!): Order # order status -> PICKED_UP (by foreign user)
    orderDecline(nodeId: NodeId!): Order # order status -> REJECTED (by store owner)
    orderAccept(nodeId: NodeId!): Order # order status -> ACCEPTED (by store owner)
    orderPlace(order: OrderInput): Order # creates order (by customer)
  }

  enum Audiences {
    CUSTOMER
    STORE
  }

  enum OrderStatus {
    ACCEPTED
    REJECTED
    PICKED_UP
  }

  interface Node {
    nodeId: NodeId! # base64 PK::SK
  }

  type OrderList {
    # edges: [OrderEdge]!
    nodes: [Order]!
  }

  # type OrderEdge {
  #   cursor: String!
  #   node: Order!
  # }

  type Order implements Node {
    nodeId: NodeId!
    pickUpCode: String!
    confirmedPickUpTime: String # ISO8601
    requestedPickUpTime: String # ISO8601
    store: Store!
    customer: Customer!
    orderStatus: OrderStatus!
    bundles: BundleList!
    shareLink: String!
  }

  input OrderInput {
    bundles: [BundleInput!]!
    store: String! # Store nodeId
    requestedPickUpTime: String # ISO8601
  }

  type BundleList {
    # edges: [BundleEdge]!
    nodes: [Bundle]!
  }

  # type BundleEdge {
  #   cursor: String!
  #   node: Bundle!
  # }

  type Bundle implements Node {
    nodeId: NodeId! # NOT any PK + SK
    items: BundleItemList!
  }

  input BundleInput {
    items: BundleItemInput!
  }

  type BundleItemList {
    # edges: [BundleItemEdge]!
    nodes: [BundleItem]!
  }

  # type BundleItemEdge {
  #   cursor: String!
  #   node: BundleItem!
  # }

  type BundleItem {
    nodeId: NodeId! # NOT any PK + SK
    quantity: Float!
    price: Float!
    name: String!
    unit: String!
  }

  input BundleItemInput {
    nodeId: NodeId!
    quantity: Float!
  }

  interface User {
    type: Audiences!
  }

  type Store implements Node & User {
    nodeId: NodeId!
    type: Audiences!
  }

  type Customer implements Node & User {
    nodeId: NodeId!
    type: Audiences!
  }

  scalar NodeId
`;

const resolvers = {
  Query: {
    orders: asPaginationResolver(Order.orders),
    order: Order.order,
  },

  NodeId,
};

export const schema = makeExecutableSchema({ typeDefs: [typeDef], resolvers });
