export const env = process.env.NODE_ENV;

export const port = Number(process.env.PORT) || 3000;

export const database = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE || 'edukat',

  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
};
