import nodemailer from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import appConfig from '~/config/app';
import mailConfig from '~/config/mail';

import ITemplateProvider from '../../TemplateProvider/ITemplateProvider';
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
        name: appConfig.name,
        address: appConfig.email,
      },

      subject,

      html,
    });
  }
}
