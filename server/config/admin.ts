type AdminConfig = {
  firstname: string;
  lastname: string;

  username: string;
  email: string;

  password: string;
};

const adminConfig: AdminConfig = {
  firstname: process.env.ADMIN_FIRSTNAME || 'Admin',
  lastname: process.env.ADMIN_LASTNAME || 'Admin',

  username: process.env.ADMIN_USERNAME || 'admin',
  email: process.env.ADMIN_EMAIL || 'admin@edukat.com.br',

  password: process.env.ADMIN_PASSWORD || 'admin',
};

export default adminConfig;
