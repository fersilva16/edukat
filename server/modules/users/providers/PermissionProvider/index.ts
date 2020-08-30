import { container } from 'tsyringe';

import IPermissionProvider from './IPermissionProvider';
import BitfieldPermissionProvider from './implementations/BitfieldPermissionProvider';

container.registerSingleton<IPermissionProvider>('PermissionProvider', BitfieldPermissionProvider);
