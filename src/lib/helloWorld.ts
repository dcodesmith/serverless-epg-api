interface IResult {
  message: string;
  input: object;
}

export default class HelloWorld {
  public sayHello(event): IResult {
    return {
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event
    };
  }
}
