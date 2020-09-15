import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';

import MissingPermissionsException from '~/exceptions/MissingPermissionsException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IMiddleware from '~/types/IMiddleware';

import { KeyofFlags } from '@users/dtos/Flags';
import IPermissionCacheProvider from '@users/providers/PermissionCacheProvider/IPermissionCacheProvider';
import IPermissionProvider from '@users/providers/PermissionProvider/IPermissionProvider';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';

@injectable()
export default class HasMiddleware implements IMiddleware {
  constructor(
    @inject('PermissionCacheProvider')
    private permissionCacheProvider: IPermissionCacheProvider,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,

    @inject('PermissionProvider')
    private permissionProvider: IPermissionProvider,
  ) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    ...flags: KeyofFlags[]
  ): Promise<void> {
    const { user } = request;

    const hasCachedPermissions = await this.permissionCacheProvider.exists(user.type_id);

    const cachedPermissions = hasCachedPermissions
      && await this.permissionCacheProvider.recover(user.type_id);

    const type = !hasCachedPermissions && await this.typeRepository.findById(user.type_id);

    if (!hasCachedPermissions) {
      if (!type) throw new ResourceNotFoundException('Type');

      await this.permissionCacheProvider.save(user.type_id, type.permissions);
    }

    const permissions = Number(hasCachedPermissions ? cachedPermissions : type.permissions);

    const missingPermissions: KeyofFlags[] = [];

    flags.forEach((name) => {
      if (!this.permissionProvider.has(permissions, name)) missingPermissions.push(name);
    });

    if (missingPermissions.length) throw new MissingPermissionsException(missingPermissions);

    next();
  }
}
