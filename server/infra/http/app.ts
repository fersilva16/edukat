import { json } from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';

import routes from './routes';

const app = express();

app.use(json());
app.use(helmet());
app.use(compression());
app.use(routes);

export default app;
