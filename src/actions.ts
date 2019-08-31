import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

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

interface IItem {
  code: string;
  name: string;
}

const dynamoDB = new AWS.DynamoDB.DocumentClient(options);

export const saveItem = async (item: IItem) => {
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
    .then(response => response)
    .catch(error => error);
};

export const getItem = async (id: string) => {
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
    .catch(error => error);
};

export const getItems = async () => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE
  };

  return dynamoDB
    .scan(params)
    .promise()
    .then(response => response)
    .catch(error => error);
};
