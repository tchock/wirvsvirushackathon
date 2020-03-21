import { Order } from 'types/order';
import { getOrderByNodeId, getOrders } from './service';
import { ResolverContext } from '../graphql/types';

export async function orders(_root, args, context: ResolverContext): Promise<Order[]> {
  return getOrders(args, context.user); // TODO pass user as 2nd arg
}

export async function order(_root, args, context: ResolverContext): Promise<Order> {
  return getOrderByNodeId(args, context.user); // TODO pass user as 2nd arg
}

export async function orderPickUp(_root, _args, _context: ResolverContext): Promise<Order> {
  return Promise.resolve({} as any);
}

export async function orderDecline(_root, _args, _context: ResolverContext): Promise<Order> {
  return Promise.resolve({} as any);
}

export async function orderAccept(_root, _args, _context: ResolverContext): Promise<Order> {
  return Promise.resolve({} as any);
}

export async function orderPlace(_root, _args, _context: ResolverContext): Promise<Order> {
  return Promise.resolve({} as any);
}
