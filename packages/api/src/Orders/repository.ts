import * as AWS from 'aws-sdk';
import { Order } from 'types/order';
import config from '../../config';

const tableName = process.env.DB_TABLE_MAIN;

const documentClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: config.DB_ENDPOINT,
  region: 'eu-west-1',
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
  const result = await documentClient.get(params).promise();
  return result.Item as Order;
}
