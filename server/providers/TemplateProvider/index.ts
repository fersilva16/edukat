import { container } from 'tsyringe';

import ITemplateProvider from './ITemplateProvider';
import HandlebarsTemplateProvider from './implementations/HandlebarsTemplateProvider';

container.registerSingleton<ITemplateProvider>('TemplateProvider', HandlebarsTemplateProvider);
