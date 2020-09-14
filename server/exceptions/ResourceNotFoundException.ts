import toUpperCase from '~/utils/toUpperCase';

import BadRequestException from './BadRequestException';

export default class ResourceNotFoundException extends BadRequestException {
  constructor(resource: string) {
    super(`${resource} not found.`, `${toUpperCase(resource)}_NOT_FOUND`);
  }
}
