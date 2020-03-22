import * as AWS from 'aws-sdk';
import { Order, Audiences, OrderStatus } from 'types/order';
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
  ItemType: DocumentTypes;
  payload: T;
};

const tableName = process.env.DB_TABLE_MAIN;

const documentClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: config.DB_ENDPOINT,
  region: 'us-east-1',
  convertEmptyValues: true,
});

export async function upsertOrder(order: Order): Promise<Order> {
  const orderId = order.nodeId;
  const userId = order.customer.nodeId;
  const storeId = order.store.nodeId;

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: {
      PK: `storeId_${storeId}`,
      SK: `orderId_${orderId}`,
      GSI_PK: `userId_${userId}`,
      GSI_SK: `orderId_${orderId}`,
      GSI_PK_2: `pickUpCode_${order.pickUpCode}`,
      ItemType: DocumentTypes.ORDER,
      payload: order,
    } as Document<Order>,
  };

  await documentClient.put(params).promise();
  return order;
}

export async function getOrder(
  nodeId: string,
  userId: string,
  userType: Audiences
): Promise<Order> {
  switch (userType) {
    case Audiences.CUSTOMER:
      return getOrderForCustomer(nodeId, userId);
    case Audiences.STORE:
      return getOrderForStore(nodeId, userId);
  }
}

export async function getOrders(
  userId: string,
  userType: Audiences,
  orderStatus?: OrderStatus
): Promise<Order[]> {
  switch (userType) {
    case Audiences.CUSTOMER:
      return getOrdersForCustomer(userId, orderStatus);
    case Audiences.STORE:
      return getOrdersForStore(userId, orderStatus);
  }
}

export async function getOrderByPickUpCode(pickUpCode) {
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: config.GSI_2_INDEX_NAME,
    KeyConditionExpression: 'GSI_PK_2 = :pickUpCode',
    ExpressionAttributeValues: {
      ':pickUpCode': `pickUpCode_${pickUpCode}`,
    },
  };

  return documentClient.query(params).promise();
}

async function getOrderForStore(userId: string, nodeId: string) {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: {
      PK: userId,
      SK: nodeId,
    },
  };
  const result = await documentClient.get(params).promise();
  return result.Item as Order;
}

async function getOrderForCustomer(nodeId: string, userId: string) {
  const orders = await queryOrders<Order>(
    'GSI_PK = :userId and GSI_SK = :nodeId',
    {
      ':userId': `userId_${userId}`,
      ':nodeId': `orderId_${nodeId}`,
    },
    config.GSI_INDEX_NAME
  );

  return orders[0] && orders[0].payload;
}

async function getOrdersForCustomer(userId: string, orderStatus?: OrderStatus) {
  return (
    await queryOrders<Order>(
      'GSI_PK = :userId',
      {
        ':userId': `userId_${userId}`,
      },
      config.GSI_INDEX_NAME,
      orderStatus
    )
  ).map(orderDocument => orderDocument.payload);
}

async function getOrdersForStore(userId: string, orderStatus?: OrderStatus) {
  return (
    await queryOrders<Order>(
      'PK = :userId',
      {
        ':userId': `userId_${userId}`,
      },
      null,
      orderStatus
    )
  ).map(orderDocument => orderDocument.payload);
}

async function queryOrders<T>(
  keyCondition: string,
  expression: Record<string, string | number>,
  index?: string,
  orderStatus?: OrderStatus
) {
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditionExpression: keyCondition,
    ExpressionAttributeValues: expression,
  };

  if (orderStatus) {
    params.FilterExpression = 'payload.orderStatus = :orderStatus';
    params.ExpressionAttributeValues[':orderStatus'] = orderStatus;
  }

  if (index) {
    params.IndexName = index;
  }

  const result = await documentClient.query(params).promise();

  const items = result.Items;

  return items as Document<T>[];
}
