const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./server/tsconfig.json');

module.exports = {
  bail: 1,

  collectCoverageFrom: ['<rootDir>/server/**/*.ts'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary', 'lcov'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/server/' }),

  preset: 'ts-jest',

  globals: {
    'ts-jest': {
      tsConfig: 'server/tsconfig.json',
    },
  },

  setupFilesAfterEnv: [
    'reflect-metadata',
    'jest-extended',
    'jest-chain',
    '<rootDir>/test/factories.ts',
  ],

  testEnvironment: 'node',

  testMatch: ['<rootDir>/**/*.test.ts'],
};
