import env from '~/utils/env';

type MailConfig = {
  driver: string;

  drivers: {
    smtp: {
      host: string;
      port: number;
      auth: {
        type: 'login';
        user: string;
        pass: string;
      };
    };
  };
};

const mailConfig: MailConfig = {
  driver: env.string('MAIL_DRIVER', 'smtp'),

  drivers: {
    smtp: {
      host: env.string('SMTP_HOST', 'localhost'),
      port: env.number('SMTP_PORT', 25),

      auth: {
        type: 'login',
        user: env.string('SMTP_USER'),
        pass: env.string('SMTP_PASS'),
      },
    },
  },
};

export default mailConfig;
