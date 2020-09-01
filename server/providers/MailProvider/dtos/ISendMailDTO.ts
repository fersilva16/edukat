import ITemplateData from '~/providers/TemplateProvider/dtos/ITemplateData';

import IMailAddressDTO from './IMailAddressDTO';

export default interface ISendMailDTO {
  to: IMailAddressDTO;
  from: IMailAddressDTO;

  subject: string;

  template: ITemplateData;
}
