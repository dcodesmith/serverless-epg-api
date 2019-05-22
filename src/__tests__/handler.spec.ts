import { hello } from '../handler';

const mockSayHelloResponse = { a: 1 };

jest.mock('../lib/helloWorld', () =>
  jest.fn().mockImplementation(() => ({
    sayHello: jest.fn().mockReturnValueOnce(mockSayHelloResponse)
  }))
);

describe('helloWorld', () => {
  const event = {};
  const context = {};

  it('should call helloWorld function with success', () => {
    const callback = jest.fn();

    hello(event, context, callback);

    const expectedResponse = {
      statusCode: 200,
      body: JSON.stringify(mockSayHelloResponse)
    };

    expect(callback).toHaveBeenCalledWith(null, expectedResponse);
  });
});
