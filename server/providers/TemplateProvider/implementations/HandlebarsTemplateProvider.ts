import Handlebars, { TemplateDelegate } from 'handlebars';
import { promises as fs } from 'fs';
import { resolve } from 'path';

import ITemplateProvider from '../ITemplateProvider';
import ITemplateData from '../dtos/ITemplateData';

export default class HandlebarsTemplateProvider implements ITemplateProvider {
  private templates = new Map<string, TemplateDelegate>();

  async parse({ file, context }: ITemplateData): Promise<string> {
    const path = resolve(__dirname, '..', '..', '..', file);

    if (this.templates.has(file)) {
      const template = this.templates.get(file);

      return template(context);
    }

    const content = await fs.readFile(path, 'utf-8');

    const template = Handlebars.compile(content);

    this.templates.set(file, template);

    return template(context);
  }
}
