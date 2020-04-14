import { APIGatewayEvent, Handler } from 'aws-lambda';
import {
  OK,
  CREATED,
  BAD_REQUEST
  // NOT_FOUND,
  // NO_CONTENT
} from 'http-status';

import 'source-map-support/register';

import HelloWorld from './lib/helloWorld';
import { Channel, Programme } from './types';

import { saveItem, saveItems, getItems } from './actions';

export const response = (fulfillmentText: any, statusCode: number): any => ({
  statusCode,
  body: JSON.stringify(fulfillmentText),
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export const hello = (event, _context, callback): void => {
  const hellowWorld = new HelloWorld();

  const response = {
    statusCode: OK,
    body: JSON.stringify(hellowWorld.sayHello(event))
  };

  callback(null, response);
};

export const hi = (_event, _context, callback): void => {
  const response = {
    statusCode: OK,
    body: JSON.stringify({ hi: 'Just saying hi!' })
  };

  callback(null, response);
};

export const createChannel: Handler = async (event: APIGatewayEvent) => {
  const item: Channel = JSON.parse(event.body);

  try {
    await saveItem(item);

    return response({ created: item }, CREATED);
  } catch (error) {
    return response({ error }, BAD_REQUEST);
  }
};

export const getChannels: Handler = async () => {
  try {
    const data: Channel[] = await getItems();

    return response(data, OK);
  } catch (error) {
    return response({ error }, BAD_REQUEST);
  }
};

export const createProgrammes: Handler = async (event: APIGatewayEvent) => {
  const items: Programme[] = JSON.parse(event.body);

  try {
    await saveItems(items);

    return response({ created: items }, CREATED);
  } catch (error) {
    return response({ error }, BAD_REQUEST);
  }
};
