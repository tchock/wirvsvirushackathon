// import * as repository from './repository';
import * as mocks from './mockData';
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
  return mocks.getOrderByNodeId(args);
}

export async function getOrders(args: getOrdersInput, user: UserInfo) {
  return mocks.getOrders(args);
}
