import { container } from 'tsyringe';

import BitfieldPermissionProvider from './implementations/BitfieldPermissionProvider';
import IPermissionProvider from './IPermissionProvider';

container.registerSingleton<IPermissionProvider>('PermissionProvider', BitfieldPermissionProvider);
