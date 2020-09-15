import BadRequestException from './BadRequestException';

export default class InvalidTokenException extends BadRequestException {
  constructor() {
    super('Invalid token', 'INVALID_TOKEN');
  }
}
