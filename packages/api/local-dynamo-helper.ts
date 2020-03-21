import * as AWS from 'aws-sdk';
import * as config from './config';

AWS.config.update({
  credentials: new AWS.Credentials('', ''),
});

const MAIN_TABLE = config.DB_TABLE_MAIN;

const dynamoDb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  endpoint: config.DB_ENDPOINT,
  region: 'eu-west-1',
});

const documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: config.DB_ENDPOINT,
  region: 'eu-west-1',
  convertEmptyValues: true,
});

export const createTables = async () => {
  await dynamoDb
    .listTables()
    .promise()
    .then(async ({ TableNames }) => {
      return await Promise.all(
        TableNames?.map(tableName =>
          dynamoDb.deleteTable({ TableName: tableName }).promise(),
        ) as any,
      );
    });
  return await dynamoDb
    .createTable({
      TableName: MAIN_TABLE,
      KeySchema: [
        {
          AttributeName: 'PK',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'SK',
          KeyType: 'RANGE',
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'PK',
          AttributeType: 'S',
        },
        {
          AttributeName: 'SK',
          AttributeType: 'S',
        },
        {
          AttributeName: 'GSI_PK',
          AttributeType: 'S',
        },
        {
          AttributeName: 'GSI_SK',
          AttributeType: 'S',
        },
        {
          AttributeName: 'GSI_PK_2',
          AttributeType: 'S',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'gsi-pk-gsi-sk-index',
          Projection: 'ALL',
          KeySchema: [
            {
              AttributeName: 'GSI_PK',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'GSI_SK',
              KeyType: 'RANGE',
            },
          ],
        },
        {
          IndexName: 'gsi-pk-2-index',
          Projection: 'ALL',
          KeySchema: [
            {
              AttributeName: 'GSI_PK_2',
              KeyType: 'HASH',
            },
          ],
        },
      ],
    })
    .promise();
};

export const loadItems = () => {
  return documentClient
    .batchWrite({
      RequestItems: {
        [MAIN_TABLE]: [].map(item => {
          return {
            PutRequest: {
              Item: item,
            },
          };
        }),
      },
    })
    .promise();
};
