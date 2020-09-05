import UnauthorizedException from './UnauthorizedException';

export default class NoPermissionException extends UnauthorizedException {
  constructor() {
    super('No permission', 'NO_PERMISSION');
  }
}
