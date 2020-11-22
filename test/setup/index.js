const dotenv = require('dotenv');
const path = require('path');
const tsNode = require('ts-node');
const tsconfigPaths = require('tsconfig-paths');

const { compilerOptions } = require('../tsconfig.json');

const resolveBasePath = (pathSegment) => path.resolve(__dirname, '../..', pathSegment);

dotenv.config({
  path: resolveBasePath('.env.test'),
});

tsNode.register({
  project: resolveBasePath('server/tsconfig.json'),
  transpileOnly: true,
});

tsconfigPaths.register({
  baseUrl: resolveBasePath('test'),

  paths: compilerOptions.paths,
});

const { default: setup } = require('./server');

module.exports = setup;
