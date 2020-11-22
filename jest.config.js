const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./test/tsconfig.json');

module.exports = {
  bail: 1,

  collectCoverageFrom: ['<rootDir>/server/**/*.ts'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary', 'lcov'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/test/' }),

  preset: 'ts-jest',

  globals: {
    'ts-jest': {
      tsConfig: 'server/tsconfig.json',
    },
  },

  setupFilesAfterEnv: [
    'reflect-metadata',
    'dotenv/config',
    'jest-extended',
    'jest-chain',
    '<rootDir>/server/test/factories.ts',
  ],

  globalSetup: '<rootDir>/test/setup/index.js',

  testEnvironment: 'node',

  testMatch: ['<rootDir>/**/*.test.ts'],
};
