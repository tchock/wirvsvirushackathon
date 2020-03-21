// import * as repository from './repository';
import * as mocks from './mockData';
import { Order, OrderStatus, Audiences } from 'types/order';

export type getOrderInput = {
  nodeId: string;
  audience: Audiences;
};

export type getOrdersInput = {
  orderStatus?: OrderStatus;
  audience: Audiences;
};

export async function getOrderByNodeId(args: getOrderInput) {
  return toOrder(await mocks.getOrderByNodeId(args));
}

export async function getOrders(args: getOrdersInput) {
  return (await mocks.getOrders(args)).map(toOrder);
}

function toOrder(dbOrder): Order {
  return {
    ...dbOrder,
    nodeId: dbOrder.SK,
  };
}
