import Exception from './Exception';

export default class ForbiddenException extends Exception {
  constructor(message: string, code: string) {
    super(message, 403, code);
  }
}
