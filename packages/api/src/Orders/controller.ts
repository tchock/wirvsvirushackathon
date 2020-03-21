import { OrderList, Order, OrderStatus } from 'types/order';
import { getOrderByNodeId } from './service';

async function orders(_root, _args, _context: any): Promise<OrderList> {
  return Promise.resolve([] as any);
}

async function order (_root, args, _context: any): Promise<Order> {
  const nodeId: string = args.nodeId;

  try {
    await getOrderByNodeId(nodeId);
  } catch (err) {
    // swallow eerroors for now
  }

  return {
    nodeId: 'some-node-id',
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
  }
}

async function orderPickUp(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

async function orderDecline(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

async function orderAccept(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

async function orderPlace(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

export default {
  resolvers: {
    queries: [
      orders,
      order,
    ],
    mutators: [
      orderPickUp,
      orderDecline,
      orderAccept,
      orderPlace,
    ],
  }
};
