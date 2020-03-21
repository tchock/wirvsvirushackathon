import { getOrder } from './repository'

export async function getOrderByNodeId(nodeId: string) {
  const orderIdentifier = (new Buffer(nodeId, 'base64')).toString('utf-8');

  const [partitionKey, sortKey] = orderIdentifier.split('::');

  return await getOrder(partitionKey, sortKey);
}
