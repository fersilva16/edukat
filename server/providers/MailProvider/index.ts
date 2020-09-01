import { container } from 'tsyringe';

import mailConfig from '~/config/mail';

import IMailProvider from './IMailProvider';
import SMTPMailProvider from './implementations/SMTPMailProvider';

const providers = {
  smtp: SMTPMailProvider,
};

container.registerSingleton<IMailProvider>('MailProvider', providers[mailConfig.driver]);
