const startNodemon = require('nodemon');

const isDebug = process.argv.includes('--inspect');

const exec = [
  'node',
  '--require ts-node/register',
  '--require tsconfig-paths/register',
  '--require dotenv/config',
  isDebug && '--inspect',
  'server/index.ts',
].filter(Boolean).join(' ');

const nodemon = startNodemon({
  watch: ['server'],
  ext: 'ts',
  exec,
  env: {
    TS_NODE_PROJECT: 'server/tsconfig.json',
    TS_NODE_TRANSPILE_ONLY: true,
  },
});

nodemon.on('log', ({ colour }) => console.log(colour));

process.on('SIGINT', () => nodemon.reset(() => process.exit(0)));
