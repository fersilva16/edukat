import UnauthorizedException from './UnauthorizedException';

export default class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super('Invalid token', 'INVALID_TOKEN');
  }
}
