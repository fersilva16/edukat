import toUpperCase from '~/utils/toUpperCase';

import BadRequestException from './BadRequestException';

export default class ResourceAlreadyExistsException extends BadRequestException {
  constructor(resource: string) {
    super(`${resource} already exists`, `${toUpperCase(resource)}_ALREADY_EXISTS`);
  }
}
