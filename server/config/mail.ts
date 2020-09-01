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
  driver: process.env.MAIL_DRIVER || 'smtp',

  drivers: {
    smtp: {
      host: process.env.SMTP_HOST || 'localhost',
      port: Number(process.env.SMTP_PORT) || 25,
      auth: {
        type: 'login',
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  },
};

export default mailConfig;
