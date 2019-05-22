import HelloWorld from '../helloWorld';

describe('Hello World', () => {
  const event = {};

  describe('When `sayHello` is invoked', () => {
    let message: string;

    beforeAll(() => {
      const helloWorld = new HelloWorld();

      ({ message } = helloWorld.sayHello(event));
    });

    it('should return the appropriate message', () => {
      expect(message).toBe(
        'Go Serverless v1.0! Your function executed successfully!'
      );
    });
  });
});
