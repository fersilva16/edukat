type AppConfig = {
  env: 'development' | 'production' | 'test';

  port: number;
};

const appConfig: AppConfig = {
  env: (process.env.NODE_ENV || 'development') as AppConfig['env'],

  port: Number(process.env.PORT || 3000),
};

export default appConfig;
