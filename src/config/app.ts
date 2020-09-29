import url from 'url';

export type AppConfig = {
  https: boolean;
  host: string;
  port: number;
  baseUrl: string;
};

// TODO: share env utils from server
const https = process.env.HTTPS ? Boolean(process.env.HTTPS) : true;
const host = process.env.HOST ? String(process.env.HOST) : '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const appConfig: AppConfig = {
  https,
  host,
  port,

  baseUrl: url.format({
    protocol: https ? 'https' : 'http',
    hostname: host,
    port,
  }),
};

export default appConfig;
