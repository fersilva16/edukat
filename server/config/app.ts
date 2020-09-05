type AppConfig = {
  env: 'development' | 'production' | 'test';

  name: string;
  email: string;

  baseUrl: string;

  host: string;
  port: number;

  secret: string;
};

const appConfig: AppConfig = {
  env: (process.env.NODE_ENV || 'development') as AppConfig['env'],

  name: process.env.APP_NAME,
  email: process.env.APP_EMAIL,

  baseUrl: process.env.APP_BASE_URL,

  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT || 3000),

  secret: process.env.SECRET,
};

export default appConfig;
