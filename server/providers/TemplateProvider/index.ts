import { container } from 'tsyringe';

import HandlebarsTemplateProvider from './implementations/HandlebarsTemplateProvider';
import ITemplateProvider from './ITemplateProvider';

container.registerSingleton<ITemplateProvider>('TemplateProvider', HandlebarsTemplateProvider);
