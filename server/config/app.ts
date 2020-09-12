import env from '~/utils/env';

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
  env: env.string('NODE_ENV', 'development') as AppConfig['env'],

  name: env.stringOrFail('APP_NAME'),
  email: env.stringOrFail('APP_EMAIL'),

  baseUrl: env.stringOrFail('APP_BASE_URL'),

  host: env.string('HOST', '0.0.0.0'),
  port: env.number('PORT', 3000),

  secret: env.stringOrFail('SECRET'),
};

export default appConfig;
