import Exception from './Exception';

export default class NotFoundException extends Exception {
  constructor() {
    super('Route not found', 404, 'ROUTE_NOT_FOUND');
  }
}
