import * as mocks from './mockData';
import { OrderStatus, Audiences, OrderInput, Order } from 'types/order';
import { UserInfo } from '../graphql/types';
import { upsertOrder } from './repository';
import * as uuid from 'uuid';

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

export async function createOrder(args: OrderInput, user: UserInfo): Promise<Order> {
  const order: Order = {
    nodeId: uuid.v4(),
    bundles: args.bundles,
    customer: {
      nodeId: user.sub,
    },
    orderStatus: null,
    requestedPickUpTime: args.requestedPickUpTime,
    pickUpCode: createFirstSegmentOfUuid(),
    store: {
      nodeId: args.store,
    },
  };

  return upsertOrder(order);
}

function createFirstSegmentOfUuid(): string {
  return uuid.v4().split('-')[0];
}
