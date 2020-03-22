import { Order } from 'types/order';
import {
  getOrderByNodeId,
  getOrders,
  createOrder,
  acceptOrder,
  declineOrder,
  pickupOrder,
} from './service';
import { ResolverContext } from '../graphql/types';

export async function orders(_root, args, context: ResolverContext): Promise<Order[]> {
  return getOrders(args, context.user); // TODO pass user as 2nd arg
}

export async function order(_root, args, context: ResolverContext): Promise<Order> {
  return getOrderByNodeId(args, context.user); // TODO pass user as 2nd arg
}

export async function orderPickUp(_root, args, context: ResolverContext): Promise<Order> {
  return pickupOrder(args, context.user);
}

export async function orderDecline(_root, args, context: ResolverContext): Promise<Order> {
  return declineOrder(args, context.user);
}

export async function orderAccept(_root, args, context: ResolverContext): Promise<Order> {
  return acceptOrder(args, context.user);
}

export async function orderPlace(_root, args, context: ResolverContext): Promise<Order> {
  return createOrder(args.order, context.user);
}

export async function orderByPickUpCode(_root, args, context: ResolverContext): Promise<Order> {
  return getOrderByPickUpCode(args, context.user);
}
