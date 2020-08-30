import { container } from 'tsyringe';

import ITypeRepository from './ITypeRepository';
import KnexTypeRepository from './implementations/KnexTypeRepository';

container.registerSingleton<ITypeRepository>(KnexTypeRepository);
