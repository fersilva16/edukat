import ISendMailDTO from './dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(options: ISendMailDTO): Promise<void>;
}
