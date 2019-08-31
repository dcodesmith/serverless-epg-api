import { APIGatewayEvent, Handler } from 'aws-lambda';
import {
  OK,
  CREATED
  // NOT_FOUND,
  // BAD_REQUEST,
  // NO_CONTENT
} from 'http-status';

// tslint:disable variable-name no-shadowed-variable no-submodule-imports

import 'source-map-support/register';

import HelloWorld from './lib/helloWorld';
import { saveItem, getItems } from './actions';

export const response = (fulfillmentText: any, statusCode: number): any => ({
  statusCode,
  body: JSON.stringify(fulfillmentText),
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

interface IItem {
  code: string;
  name: string;
}

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
  const item: IItem = JSON.parse(event.body);

  try {
    await saveItem(item);

    return response({ created: item }, CREATED);
  } catch (error) {
    return response({ error }, 400);
  }
};

export const getChannels: Handler = async () => {
  try {
    const data: IItem[] = await getItems();
    return response(data, OK);
  } catch (error) {
    return response({ error }, 400);
  }
};
