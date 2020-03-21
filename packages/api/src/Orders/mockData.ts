import { OrderStatus } from "types/order";

export async function getOrderMocks() {
  return [{
    nodeId: 'some-node-id-0',
    bundles: {
      nodes: [
        {
          items: {
            nodes: [
              {
                nodeId: 'some-item-node-id-0',
                name: 'sauerkraut',
                price: '0.50',
                quantity: 1,
                unit: 'jar?'
              },
              {
                nodeId: 'some-item-node-id-1',
                name: 'noodles',
                price: '7.50',
                quantity: 1,
                unit: 'kilos'
              },
            ]
          },
          nodeId: 'some-bundle-node-id',
        }
      ]
    },
    customer: { nodeId: 'some-customer-node-id' },
    orderStatus: OrderStatus.ACCEPTED,
    pickUpCode: '123456',
    shareLink: 'https://www.googl.com',
    store: { nodeId: 'some-store-node-id' },
    confirmedPickUpTime: '2020-06-06T00:00:00.000Z',
    requestedPickUpTime: '2020-06-07T00:00:00.000Z',
  }, {
    nodeId: 'some-node-id-1',
    bundles: {
      nodes: [
        {
          items: {
            nodes: [
              {
                nodeId: 'some-item-node-id-0',
                name: 'sauerkraut',
                price: '0.50',
                quantity: 1,
                unit: 'jar?'
              },
            ]
          },
          nodeId: 'some-bundle-node-id',
        }
      ]
    },
    customer: { nodeId: 'some-customer-node-id' },
    orderStatus: OrderStatus.REJECTED,
    pickUpCode: '123456',
    shareLink: 'https://www.googl.com',
    store: { nodeId: 'some-store-node-id' },
    confirmedPickUpTime: '2020-06-06T00:00:00.000Z',
    requestedPickUpTime: '2020-06-07T00:00:00.000Z',
  },{
    nodeId: 'some-node-id-2',
    bundles: {
      nodes: [
        {
          items: {
            nodes: [
              {
                nodeId: 'some-item-node-id',
                name: 'sauerkraut',
                price: '0.50',
                quantity: 1,
                unit: 'jar?'
              },
              {
                nodeId: 'some-item-node-id',
                name: 'noodles',
                price: '7.50',
                quantity: 1,
                unit: 'kilos'
              },
            ]
          },
          nodeId: 'some-bundle-node-id',
        }
      ]
    },
    customer: { nodeId: 'some-customer-node-id' },
    orderStatus: OrderStatus.ACCEPTED,
    pickUpCode: '123456',
    shareLink: 'https://www.googl.com',
    store: { nodeId: 'some-store-node-id' },
    confirmedPickUpTime: '2020-06-06T00:00:00.000Z',
    requestedPickUpTime: '2020-06-07T00:00:00.000Z',
  }];
}

export async function getOrders(){
  // TODO add audience and order status filter
  return getOrderMocks()
} 

export async function getOrderByNodeId(nodeId: string){
  return (await getOrderMocks()).find(order => order.nodeId === nodeId)
}