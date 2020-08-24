import Exception from './Exception';

export default class AuthenticationException extends Exception {
  constructor(message: string, code: string) {
    super(message, 401, code);
  }
}
