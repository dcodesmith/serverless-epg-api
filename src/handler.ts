// import { APIGatewayProxyHandler } from 'aws-lambda';
// tslint:disable-next-line:no-submodule-imports
import 'source-map-support/register';

import HelloWorld from './lib/helloWorld';

// tslint:disable-next-line:variable-name
export const hello = (event, _context, callback): void => {
  const hellowWorld = new HelloWorld();

  const response = {
    statusCode: 200,
    body: JSON.stringify(hellowWorld.sayHello(event))
  };

  callback(null, response);
};

export const hi = (_event, _context, callback): void => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ hi: 'Just saying hi!' })
  };

  callback(null, response);
};
