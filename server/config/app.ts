type AppConfig = {
  env: 'development' | 'production' | 'test';

  port: number;

  secret: string;
};

const appConfig: AppConfig = {
  env: (process.env.NODE_ENV || 'development') as AppConfig['env'],

  port: Number(process.env.PORT || 3000),

  secret: process.env.SECRET,
};

export default appConfig;
