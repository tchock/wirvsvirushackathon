// import * as repository from './repository';
import * as mocks from './mockData';
import { Order } from 'types/order';

export async function getOrderByNodeId(nodeId: string) {
  return toOrder(await mocks.getOrderByNodeId(nodeId));
}

export async function getOrders() {
  return (await mocks.getOrders()).map(toOrder);
}

function toOrder(dbOrder): Order {
  return {
    ...dbOrder,
    nodeId: dbOrder.SK,
  };
}
