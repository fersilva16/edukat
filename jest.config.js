const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./server/tsconfig.json');

module.exports = {
  bail: 1,

  collectCoverageFrom: ['<rootDir>/server/**/*.ts'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary', 'lcov'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),

  preset: 'ts-jest',

  testEnvironment: 'node',

  testMatch: ['<rootDir>/**/*.test.ts'],
};
