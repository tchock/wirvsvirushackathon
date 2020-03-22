// import * as mocks from './mockData';
import { OrderStatus, Audiences, OrderInput, Order } from 'types/order';
import { UserInfo } from '../graphql/types';
import * as repository from './repository';
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
  return repository.getOrder(args.nodeId, user.sub, args.audience);
}

export async function getOrders(args: getOrdersInput, user: UserInfo) {
  return repository.getOrders(user.sub, args.audience, args.orderStatus);
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

  return repository.upsertOrder(order);
}

function createFirstSegmentOfUuid(): string {
  return uuid.v4().split('-')[0];
}
