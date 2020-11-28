import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';

import MissingOneOfPermissionsException from '~/exceptions/MissingOneOfPermissionsException';
import MissingPermissionsException from '~/exceptions/MissingPermissionsException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import type { IMiddleware } from '~/types';

import { KeyofFlags } from '@users/dtos/Flags';
import IPermissionCacheProvider from '@users/providers/PermissionCacheProvider/IPermissionCacheProvider';
import IPermissionProvider from '@users/providers/PermissionProvider/IPermissionProvider';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';

@injectable()
export default class PermissionsMiddleware implements IMiddleware {
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
    hasAll: boolean,
    ...flags: KeyofFlags[]
  ): Promise<void> {
    const { user } = request;

    if (!user) throw new ResourceNotFoundException('User');

    const hasCachedPermissions = await this.permissionCacheProvider.exists(user.typeId);

    const cachedPermissions = hasCachedPermissions
      && await this.permissionCacheProvider.recover(user.typeId);

    const type = !hasCachedPermissions
      ? await this.typeRepository.findById(user.typeId)
      : undefined;

    if (!hasCachedPermissions) {
      if (!type) throw new ResourceNotFoundException('Type');

      await this.permissionCacheProvider.save(user.typeId, type.permissions);
    }

    const permissions = Number(hasCachedPermissions ? cachedPermissions : type!.permissions);

    if (hasAll) {
      const missingPermissions = flags.filter((name) => (
        !this.permissionProvider.has(permissions, name)
      ));

      if (missingPermissions.length) throw new MissingPermissionsException(missingPermissions);
    } else {
      const hasPermission = flags.some((name) => this.permissionProvider.has(permissions, name));

      if (!hasPermission) throw new MissingOneOfPermissionsException(flags);
    }

    request.userType = type;

    next();
  }
}
