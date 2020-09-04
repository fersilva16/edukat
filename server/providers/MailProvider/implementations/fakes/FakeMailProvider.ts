import ISendMailDTO from '../../dtos/ISendMailDTO';
import IMailProvider from '../../IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private mails: ISendMailDTO[] = [];

  async sendMail(mail: ISendMailDTO): Promise<void> {
    this.mails.push(mail);
  }
}
