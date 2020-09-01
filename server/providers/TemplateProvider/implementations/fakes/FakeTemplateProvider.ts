import ITemplateProvider from '../../ITemplateProvider';
import ITemplateData from '../../dtos/ITemplateData';

export default class FakeTemplateProvider implements ITemplateProvider {
  async parse({ file, context }: ITemplateData): Promise<string> {
    return `${file}: ${Object.keys(context).join(', ')}`;
  }
}
