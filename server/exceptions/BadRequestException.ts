import Exception from './Exception';

export default class BadRequestException extends Exception {
  constructor(message: string, code: string) {
    super(message, 400, code);
  }
}
