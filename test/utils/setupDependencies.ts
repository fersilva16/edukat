import { config } from 'dotenv';
import path from 'path';
import { register } from 'tsconfig-paths';

import { compilerOptions } from '../tsconfig.json';

const resolveBasePath = (pathSegment: string) => path.resolve(__dirname, '../..', pathSegment);

config({
  path: resolveBasePath('.env.test'),
});

register({
  baseUrl: resolveBasePath('test'),

  paths: compilerOptions.paths,
});
