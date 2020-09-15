import UnauthorizedException from './UnauthorizedException';

export default class InvalidSessionTokenException extends UnauthorizedException {
  constructor() {
    super('Invalid session token', 'INVALID_SESSION_TOKEN');
  }
}
