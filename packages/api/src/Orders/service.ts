import { getOrder } from './repository'

export async function getOrderByNodeId(nodeId: string) {
  return await getOrder(nodeId);
}
