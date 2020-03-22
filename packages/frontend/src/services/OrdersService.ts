import { gql } from "apollo-boost";

export const GET_CUSTOMER_ORDERS = gql`
  query {
    orders(audience: CUSTOMER) {
      nodes {
        nodeId
        bundles {
          nodes {
            nodeId
            items {
              nodes {
                quantity
                price
                name
                unit
              }
            }
          }
        }
        pickUpCode
        orderStatus
        confirmedPickUpTime
        requestedPickUpTime
      }
    }
  }
`;

export const GET_ACCEPTED_ORDERS = gql`
  query {
    orders(audience: STORE) {
      nodes {
        nodeId
        customer {
          nodeId
        }
        bundles {
          nodes {
            nodeId
            items {
              nodes {
                quantity
                price
                name
                unit
              }
            }
          }
        }
        pickUpCode
        orderStatus
        confirmedPickUpTime
        requestedPickUpTime
      }
    }
  }
`;

export const GET_ORDER = gql`
  query($nodeId: NodeId!) {
    order(audience: STORE, nodeId: $nodeId) {
      nodeId
      customer {
        nodeId
      }
      bundles {
        nodes {
          nodeId
          items {
            nodes {
              quantity
              price
              name
              unit
            }
          }
        }
      }
      pickUpCode
      orderStatus
      confirmedPickUpTime
      requestedPickUpTime
    }
  }
`;

export const getPendingOrder = () => gql`
  query {
    orders(audience: STORE) {
      nodes {
        nodeId
        customer {
          nodeId
        }
        bundles {
          nodes {
            nodeId
            items {
              nodes {
                quantity
                price
                name
                unit
              }
            }
          }
        }
        pickUpCode
        orderStatus
        confirmedPickUpTime
        requestedPickUpTime
      }
    }
  }
`;

const orderFragment = `
  nodeId
  pickUpCode
  confirmedPickUpTime
  requestedPickUpTime
  store {
    nodeId
    type
  }
  customer {
    nodeId
    type
  }
  orderStatus
  bundles {
    nodes {
      nodeId
      items {
        nodes {
          quantity
          price
          name
          unit
        }
      }
    }
  }
  shareLink
`;

export const PLACE_ORDER = gql`
  mutation orderPlace($orderInput: OrderInput) {
  orderPlace (order: $orderInput) {
    ${orderFragment}
  }
}
`;

export const APPROVE_ORDER = gql`
  mutation orderAccept($nodeId: NodeId!) {
    orderAccept(nodeId: $nodeId) {
      ${orderFragment}
    }
  }
`;

export const DENY_ORDER = gql`
  mutation orderDecline($nodeId: NodeId!) {
    orderDecline(nodeId: $nodeId) {
      ${orderFragment}
    }
  }
`;

export const PICK_UP_ORDER = gql`
  mutation orderPickUp($pickUpCode: String!) {
    orderPickUp(pickUpCode: $pickUpCode) {
      ${orderFragment}
    }
  }
`;
