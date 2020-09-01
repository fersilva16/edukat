import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

import Flags, { KeyofFlags } from '@users/dtos/Flags';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';
import IPermissionProvider from '@users/providers/PermissionProvider/IPermissionProvider';

import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import MissingPermissionsException from '~/exceptions/MissingPermissionsException';

const typeRepository = container.resolve<ITypeRepository>('TypeRepository');
const permissionProvider = container.resolve<IPermissionProvider>('PermissionProvider');

export default function has(...flags: KeyofFlags[]) {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { user } = request;

    const type = await typeRepository.findById(user.type_id);

    if (!type) throw new ResourceNotFoundException('Type');

    const permissions = Number(type.permissions);

    const missingPermissions: KeyofFlags[] = [];

    flags.forEach((name) => {
      const permission = Flags[name];

      if (!permissionProvider.has(permissions, permission)) missingPermissions.push(name);
    });

    if (missingPermissions.length) throw new MissingPermissionsException(missingPermissions);

    next();
  };
}
