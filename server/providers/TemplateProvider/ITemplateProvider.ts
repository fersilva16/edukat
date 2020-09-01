import ITemplateData from './dtos/ITemplateData';

export default interface ITemplateProvider {
  parse(data: ITemplateData): Promise<string>;
}
