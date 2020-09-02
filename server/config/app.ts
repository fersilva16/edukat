type AppConfig = {
  env: 'development' | 'production' | 'test';

  host: string;
  port: number;

  secret: string;
};

const appConfig: AppConfig = {
  env: (process.env.NODE_ENV || 'development') as AppConfig['env'],

  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT || 3000),

  secret: process.env.SECRET,
};

export default appConfig;
