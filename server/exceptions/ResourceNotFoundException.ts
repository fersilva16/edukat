import BadRequestException from './BadRequestException';

export default class ResourceNotFoundException extends BadRequestException {
  constructor(resource: string) {
    super(`${resource} not found.`, `${resource.toUpperCase()}_NOT_FOUND`);
  }
}
