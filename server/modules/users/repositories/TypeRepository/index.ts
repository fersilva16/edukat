import { container } from 'tsyringe';

import KnexTypeRepository from './implementations/KnexTypeRepository';
import ITypeRepository from './ITypeRepository';

container.registerSingleton<ITypeRepository>('TypeRepository', KnexTypeRepository);
