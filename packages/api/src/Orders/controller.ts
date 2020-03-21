import { OrderList, Order, OrderStatus } from 'types/order';
import { getOrderByNodeId } from './mockData';

export async function orders(_root, _args, _context: any): Promise<OrderList> {
  console.log("FUCKING ORDERS")
  return Promise.resolve([] as any);
}

export async function order (_root, args, _context: any): Promise<Order> {
  const nodeId: string = args.nodeId;

  return getOrderByNodeId(nodeId)
}

export async function orderPickUp(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

export async function orderDecline(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

export async function orderAccept(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

export async function orderPlace(_root, _args, _context: any): Promise<Order> {
  return Promise.resolve({} as any);
}

console.log("PENOS")