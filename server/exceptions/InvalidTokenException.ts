import AuthenticationException from './AuthenticationException';

export default class InvalidTokenException extends AuthenticationException {
  constructor() {
    super('Invalid token', 'INVALID_TOKEN');
  }
}
