import { makeExecutableSchema } from "apollo-server-lambda"

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

type OrderInput {
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
  items: ItemList!
}

type BundleInput {
  items: ItemList!
}

type ItemList {
  # edges: [ItemEdge]!
  nodes: [Item]!
}

# type ItemEdge {
#   cursor: String!
#   node: Item!
# }

type Item {
  nodeId: String! # NOT any PK + SK
  quantity: Float!
  price: Float!
  name: String!
  unit: String!
}

interface User {
  type: Audiences!
}

type Store implements Node & User {
  nodeId: String!
  type: STORE
}

type Customer implements Node & User {
  nodeId: String!
  type: CUSTOMER
}
`

const resolvers = {

  // Query: {
  //   orders:  async (root, args, context) => {}
  // },

  // Order: {
  //   nodeId: nodeIdResovler
  // }

}

export const schema = makeExecutableSchema({ typeDefs: [typeDef], resolvers })
