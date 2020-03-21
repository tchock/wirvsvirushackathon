import { OrderList, Order } from 'types/order';

async function orders(_root, _args, _context: any): Promise<OrderList> {
  return Promise.resolve([] as any);
}

async function order (_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
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
