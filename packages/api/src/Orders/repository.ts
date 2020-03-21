import * as AWS from 'aws-sdk';
import { Order } from 'types/order';
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
})

export async function getOrder(nodeId): Promise<Order> {
  const orderIdentifier = (new Buffer(nodeId, 'base64')).toString('utf-8');

  const [PK, SK] = orderIdentifier.split('::');

  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: {
      PK,
      SK,
    }
  }
  const result = await documentClient
    .get(params)
    .promise();
  return result.Item as Order;
}

export async function saveOrder(order: Order): Promise<Order> {
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
  }

  await documentClient.put(params).promise();
  return order;
}

export async function getOrderByPickUpCode(pickUpCode) {
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: 'index',
    KeyConditionExpression: 'GSI_PK_2 = :pickUpCode',
    ExpressionAttributeValues: {
      ':pickUpCode': pickUpCode,
    },
  };

  return await documentClient.query(params).promise();
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
