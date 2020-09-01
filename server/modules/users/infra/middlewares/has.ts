import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

import { KeyofFlags } from '@users/dtos/Flags';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';
import IPermissionProvider from '@users/providers/PermissionProvider/IPermissionProvider';
import IPermissionCacheProvider from '@users/providers/PermissionCacheProvider/IPermissionCacheProvider';

import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import MissingPermissionsException from '~/exceptions/MissingPermissionsException';

const typeRepository = container.resolve<ITypeRepository>('TypeRepository');
const permissionProvider = container.resolve<IPermissionProvider>('PermissionProvider');
const permissionCacheProvider = container.resolve<IPermissionCacheProvider>('PermissionCacheProvider');

export default function has(...flags: KeyofFlags[]) {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { user } = request;

    const cachedPermissions = await permissionCacheProvider.recover(user.type_id);

    const type = !cachedPermissions && await typeRepository.findById(user.type_id);

    if (!cachedPermissions) {
      if (!type) throw new ResourceNotFoundException('Type');

      permissionCacheProvider.save(user.type_id, type.permissions);
    }

    const permissions = Number(cachedPermissions || type.permissions);

    const missingPermissions: KeyofFlags[] = [];

    flags.forEach((name) => {
      if (!permissionProvider.has(permissions, name)) missingPermissions.push(name);
    });

    if (missingPermissions.length) throw new MissingPermissionsException(missingPermissions);

    next();
  };
}
