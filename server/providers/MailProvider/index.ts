import { container } from 'tsyringe';

import mailConfig from '~/config/mail';

import IMailProvider from './IMailProvider';
import SMTPMailProvider from './implementations/SMTPMailProvider';

const providers = {
  smtp: SMTPMailProvider,
};

if (!Object.keys(providers).includes(mailConfig.driver)) throw new Error('Invalid mail provider');

container.registerSingleton<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver as keyof typeof providers],
);
