import Exception from './Exception';

export default class UnauthorizedException extends Exception {
  constructor(message: string, code: string) {
    super(message, 401, code);
  }
}
