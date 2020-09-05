import ITemplateData from '~/providers/TemplateProvider/dtos/ITemplateData';

export default interface ISendMailDTO {
  to: {
    name?: string;
    email: string;
  };

  subject: string;

  template: ITemplateData;
}
