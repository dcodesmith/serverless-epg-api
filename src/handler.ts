import { APIGatewayEvent, Handler } from 'aws-lambda';
import {
  OK,
  CREATED,
  // NOT_FOUND,
  // BAD_REQUEST,
  // NO_CONTENT
} from 'http-status';

// tslint:disable-next-line:no-submodule-imports
import 'source-map-support/register';

export const response = (fulfillmentText: any, statusCode: number): any => {
  return {
    statusCode,
    body: JSON.stringify(fulfillmentText),
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
};

import HelloWorld from './lib/helloWorld';
import { saveItem, getItems } from './actions';
type Item = {
  code: string,
  name: string
}
// tslint:disable-next-line:variable-name
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
  const incoming: { item: Item } = JSON.parse(event.body);
  const { item } = incoming;

  try {
    await saveItem(item);

    return response({ created: incoming }, CREATED);
  } catch (error) {
    console.error(error);
    // return respond(err, 400);
  }
};

export const getChannels: Handler = async () => {
  // event: APIGatewayEvent
  // const incoming: { item: Item } = JSON.parse(event.body);
  // const { item } = incoming;

  try {
    const data = await getItems();
    // console.log('data', data);

    return response(data, OK);
  } catch (error) {
    console.error(error);
    // return respond(err, 400);
  }
};