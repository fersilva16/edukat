import BadRequestException from './BadRequestException';

export default class ResourceAlreadyExistsException extends BadRequestException {
  constructor(resource: string) {
    super(`${resource} already exists`, `${resource.toUpperCase()}_ALREADY_EXISTS`);
  }
}
