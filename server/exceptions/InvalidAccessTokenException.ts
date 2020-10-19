import UnauthorizedException from './UnauthorizedException';

export default class InvalidAccessTokenException extends UnauthorizedException {
  constructor() {
    super('Invalid access token', 'INVALID_ACCESS_TOKEN');
  }
}
