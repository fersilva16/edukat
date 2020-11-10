import 'reflect-metadata';

import { config } from 'dotenv';
import path from 'path';
import * as TSNode from 'ts-node';
import * as TSConfigPaths from 'tsconfig-paths';

import { compilerOptions } from '../tsconfig.json';

config({
  path: path.resolve(__dirname, '../../.env.test'),
});

TSNode.register({
  project: path.resolve(__dirname, '../../server/tsconfig.json'),
  transpileOnly: true,
});

TSConfigPaths.register({
  baseUrl: path.resolve(__dirname, '..'),

  paths: compilerOptions.paths,
});

const { default: setup } = require('./server');

export default setup;
