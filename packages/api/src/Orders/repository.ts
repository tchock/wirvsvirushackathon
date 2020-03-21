import * as AWS from 'aws-sdk';
import { Order, Audiences } from 'types/order';
import config from '../../config';

enum DocumentTypes {
  ORDER = 'ORDER',
}

type Document<T> = {
  PK: string;
  SK: string;
  GSI_PK: string;
  GSI_SK: string;
  GSI_PK_2: string;
  ItemType: DocumentTypes,
  payload: T,
}

const tableName = process.env.DB_TABLE_MAIN;

const documentClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: config.DB_ENDPOINT,
  region: 'us-east-1',
  convertEmptyValues: true,
});

export async function saveOrder(order: Order): Promise<Order> {
  const orderId = order.nodeId;
  const userId = order.customer.nodeId;
  const storeId = order.store.nodeId;

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: {
      PK: storeId,
      SK: orderId,
      GSI_PK: userId,
      GSI_SK: orderId,
      GSI_PK_2: order.pickUpCode,
      ItemType: DocumentTypes.ORDER,
      payload: order,
    } as Document<Order>
  }

  await documentClient.put(params).promise();
  return order;
}

export async function updateOrder(order: Order): Promise<Order> {
  const orderId = (new Buffer(order.nodeId, 'base64')).toString('utf-8');
  const userId = (new Buffer(order.customer.nodeId, 'base64')).toString('utf-8');
  const storeId = (new Buffer(order.store.nodeId, 'base64')).toString('utf-8');

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: {
      PK: storeId,
      SK: orderId,
      GSI_PK: userId,
      GSI_SK: orderId,
      GSI_PK_2: order.pickUpCode,
      ItemType: DocumentTypes.ORDER,
      payload: order,
    } as Document<Order>
  };

  await documentClient.put(params).promise();

  // normally I would do getOrder but I think it's fine here
  return order;
}

export async function getOrder(
  nodeId: string,
  userId: string,
  userType: Audiences
): Promise<Order> {
  switch(userType) {
    case Audiences.CUSTOMER:
      return getOrderForCustomer(nodeId, userId);
    case Audiences.STORE:
      return getOrderForStore(nodeId, userId);
  }
}

export async function getOrders(
  userId: string,
  userType: Audiences
): Promise<Order[]> {
  switch(userType) {
    case Audiences.CUSTOMER:
      return getOrdersForCustomer(userId);
    case Audiences.STORE:
      return getOrdersForStore(userId);
  }
}

export async function getOrderByPickUpCode(pickUpCode) {
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: config.GSI_2_INDEX_NAME,
    KeyConditionExpression: 'GSI_PK_2 = :pickUpCode',
    ExpressionAttributeValues: {
      ':pickUpCode': pickUpCode,
    },
  };

  return await documentClient.query(params).promise();
}

async function getOrderForStore(userId: string, nodeId: string) {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: {
      PK: userId,
      SK: nodeId,
    }
  }
  const result = await documentClient
    .get(params)
    .promise();
  return result.Item as Order;
}

async function getOrderForCustomer(
  nodeId: string,
  userId: string,
) {
  const orders = await queryOrders<Order>(
    'GSI_PK = :userId and GSI_SK = :nodeId',
    {
      ':userId': userId,
      ':nodeId': nodeId,
    },
    config.GSI_INDEX_NAME,
  );

  return orders[0];
}

async function getOrdersForCustomer(userId: string) {
  return queryOrders<Order>(
    'GSI_PK = :userId',
    {
      ':userId': userId,
    },
    config.GSI_INDEX_NAME,
  );
}

async function getOrdersForStore(userId: string) {
  return queryOrders<Order>(
    'PK = :userId',
    {
      ':userId': userId,
    },
  );
}

async function queryOrders<T>(
  keyCondition: string,
  expression: Record<string, string|number>,
  index?: string,
) {
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditionExpression: keyCondition,
    ExpressionAttributeValues: expression
  }

  if (index) {
    params.IndexName = index;
  }

  const result = await documentClient
    .query(params)
    .promise();

  const items = result.Items

  if (items.length === 0) {
    throw new Error('Record not found');
  }

  return items as T[];
}
