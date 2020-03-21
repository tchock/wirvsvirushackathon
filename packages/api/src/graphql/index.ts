import { makeExecutableSchema } from "apollo-server-lambda"
import { asPaginationResolver } from "./pagination"
import Order from "../Orders"

const typeDef = /* GraphQL */ `
type Query {
  orders(audience: Audiences!): OrderList
  order(
    nodeId: String!
  ): Order
}

type Mutation {
  orderPickUp(pickUpCode: String!): Order # order status -> PICKED_UP
  orderDecline(nodeId: String!): Order # order status -> REJECTED
  orderAccept(nodeId: String!): Order # order status -> ACCEPTED
  orderPlace(order: OrderInput): Order # creates order
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
  nodeId: String! # base64 PK::SK
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
  nodeId: String!
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
  nodeId: String! # NOT any PK + SK
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
  nodeId: String! # NOT any PK + SK
  quantity: Float!
  price: Float!
  name: String!
  unit: String!
}

input BundleItemInput {
  nodeId: String!
  quantity: Float!
}

interface User {
  type: Audiences!
}

type Store implements Node & User {
  nodeId: String!
  type: Audiences!
}

type Customer implements Node & User {  
  nodeId: String!
  type: Audiences!
}
`

const resolvers = {

  Query: {
    orders:  asPaginationResolver(Order.orders),
    order: Order.order,
  },

  Order: {
    // nodeId: nodeIdResovler TODO
  }

}

export const schema = makeExecutableSchema({ typeDefs: [typeDef], resolvers })
