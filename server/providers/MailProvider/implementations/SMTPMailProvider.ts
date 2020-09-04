import nodemailer from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import mailConfig from '~/config/mail';
import ITemplateProvider from '~/providers/TemplateProvider/ITemplateProvider';

import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../IMailProvider';

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
