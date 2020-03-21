import { Order } from 'types/order';
import { getOrderByNodeId, getOrders } from './service';

export async function orders(_root, args, _context: any): Promise<Order[]> {
  return getOrders(args); // TODO pass user as 2nd arg
}

export async function order(_root, args, _context: any): Promise<Order> {
  return getOrderByNodeId(args); // TODO pass user as 2nd arg
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
