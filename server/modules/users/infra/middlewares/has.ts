import { container } from 'tsyringe';

import MissingPermissionsException from '~/exceptions/MissingPermissionsException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import createMiddleware from '~/utils/createMiddleware';

import { KeyofFlags } from '@users/dtos/Flags';
import IPermissionCacheProvider from '@users/providers/PermissionCacheProvider/IPermissionCacheProvider';
import IPermissionProvider from '@users/providers/PermissionProvider/IPermissionProvider';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';

const typeRepository = container.resolve<ITypeRepository>('TypeRepository');
const permissionProvider = container.resolve<IPermissionProvider>('PermissionProvider');
const permissionCacheProvider = container.resolve<IPermissionCacheProvider>('PermissionCacheProvider');

export default function has(...flags: KeyofFlags[]) {
  return createMiddleware(
    async (request, response, next) => {
      const { user } = request;

      const hasCachedPermissions = await permissionCacheProvider.exists(user.type_id);

      const cachedPermissions = hasCachedPermissions
        && await permissionCacheProvider.recover(user.type_id);

      const type = !hasCachedPermissions && await typeRepository.findById(user.type_id);

      if (!hasCachedPermissions) {
        if (!type) throw new ResourceNotFoundException('Type');

        await permissionCacheProvider.save(user.type_id, type.permissions);
      }

      const permissions = Number(hasCachedPermissions ? cachedPermissions : type.permissions);

      const missingPermissions: KeyofFlags[] = [];

      flags.forEach((name) => {
        if (!permissionProvider.has(permissions, name)) missingPermissions.push(name);
      });

      if (missingPermissions.length) throw new MissingPermissionsException(missingPermissions);

      next();
    },
  );
}
