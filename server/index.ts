import createConnection from './infra/typeorm';
import createServer from './infra/http/server';

createConnection().then(() => createServer());
