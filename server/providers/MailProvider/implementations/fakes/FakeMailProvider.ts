import IMailProvider from '../../IMailProvider';
import ISendMailDTO from '../../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private mails: ISendMailDTO[] = [];

  async sendMail(mail: ISendMailDTO): Promise<void> {
    this.mails.push(mail);
  }
}
