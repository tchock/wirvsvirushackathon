import * as repository from './repository';
import { OrderStatus, Audiences } from 'types/order';
import { UserInfo } from '../graphql/types';

export type getOrderInput = {
  nodeId: string;
  audience: Audiences;
};

export type getOrdersInput = {
  orderStatus?: OrderStatus;
  audience: Audiences;
};

export async function getOrderByNodeId(args: getOrderInput, user: UserInfo) {
  return repository.getOrder(args.nodeId, user.sub, args.audience);
}

export async function getOrders(args: getOrdersInput, user: UserInfo) {
  return repository.getOrders(user.sub, args.audience, args.orderStatus);
}
