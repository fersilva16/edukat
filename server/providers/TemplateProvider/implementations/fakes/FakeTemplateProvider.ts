import ITemplateData from '../../dtos/ITemplateData';
import ITemplateProvider from '../../ITemplateProvider';

export default class FakeTemplateProvider implements ITemplateProvider {
  async parse({ file, context }: ITemplateData): Promise<string> {
    return `${file}: ${Object.keys(context).join(', ')}`;
  }
}
