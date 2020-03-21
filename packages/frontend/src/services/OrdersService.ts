import { gql } from "apollo-boost";

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
    order(nodeId: $nodeId) {
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

export const APPROVE_ORDER = gql`
  mutation orderAccept($nodeId: NodeId!) {
    orderAccept(nodeId: $nodeId) {
      nodeId
    }
  }
`;

export const DENY_ORDER = gql`
  mutation orderDecline($nodeId: NodeId!) {
    orderDecline(nodeId: $nodeId) {
      nodeId
    }
  }
`;

export const placeOrder = orderId => gql`
  mutation {
    orderPlace(nodeId: "${orderId}") {
      nodeId
    }
  }
`;

export const PICK_UP_ORDER = gql`
  mutation orderPickUp($pickUpCode: String!) {
    orderPickUp(pickUpCode: $pickUpCode) {
      nodeId
    }
  }
`;
