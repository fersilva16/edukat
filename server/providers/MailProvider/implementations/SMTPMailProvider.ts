import { injectable, inject } from 'tsyringe';
import nodemailer from 'nodemailer';

import mailConfig from '~/config/mail';
import ITemplateProvider from '~/providers/TemplateProvider/ITemplateProvider';

import IMailProvider from '../IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SMTPMailProvider implements IMailProvider {
  private transport = nodemailer.createTransport(mailConfig.drivers.smtp);

  constructor(
    @inject('TemplateProvider')
    private templateProvider: ITemplateProvider,
  ) {}

  async sendMail({
    to,
    from,
    subject,
    template,
  }: ISendMailDTO): Promise<void> {
    const html = await this.templateProvider.parse(template);

    await this.transport.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },

      from: {
        name: from.name,
        address: from.email,
      },

      subject,

      html,
    });
  }
}
