import env from '~/utils/env';

type MailConfig = {
  driver: string;

  drivers: {
    smtp: {
      host: string;
      port: number;
      auth?: {
        type: 'login';
        user: string;
        pass: string;
      };
    };
  };
};

const driver = env.string('MAIL_DRIVER', 'smtp')!;

const mailConfig: MailConfig = {
  driver,

  drivers: {
    smtp: {
      host: env.string('SMTP_HOST', 'localhost')!,
      port: env.number('SMTP_PORT', 25)!,

      auth: driver === 'smtp'
        ? {
          type: 'login',
          user: env.stringOrFail('SMTP_USER'),
          pass: env.stringOrFail('SMTP_PASS'),
        }
        : undefined,
    },
  },
};

export default mailConfig;
