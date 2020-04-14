import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Channel, Programme } from './types';

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
  };
}

const dynamoDB = new AWS.DynamoDB.DocumentClient(options);

export const saveItem = async (item: Channel): Promise<any> => {
  const id: string = uuid();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id,
      ...item
    }
  };

  return dynamoDB
    .put(params)
    .promise()
    .then((response) => response)
    .catch((error) => error);
};

export const saveItems = async (items: Programme[]): Promise<any> => {
  const params = {
    RequestItems: {
      [process.env.DYNAMODB_TABLE]: items.map((item) => {
        const id = uuid();
        // item.id = id;
        return { PutRequest: { Item: { id, ...item } } };
      })
    }
  };

  return dynamoDB.batchWrite(params).promise();
  // .then(response => {
  //   console.log('response')
  //   console.log(response)
  // })
  // .catch(error => {
  //   console.log('error')
  //   console.log(error)
  // });
};

export const getItem = async (id: string): Promise<any> => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id
    }
  };

  return dynamoDB
    .get(params)
    .promise()
    .then(({ Item }) => Item)
    .catch((error) => error);
};

export const getItems = async (): Promise<any> => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE
  };

  return dynamoDB
    .scan(params)
    .promise()
    .then((response) => response)
    .catch((error) => error);
};
