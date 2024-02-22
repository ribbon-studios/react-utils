import type { Config } from 'jest';
import { readFileSync } from 'fs';

// Changed sourcemaps to inline resolving issues with https://github.com/swc-project/swc/issues/3854
const config = JSON.parse(readFileSync(`${__dirname}/.swcrc`, 'utf-8'));

export default {
  roots: ['<rootDir>/src'],
  testEnvironment: '@happy-dom/jest-environment',

  moduleNameMapper: {
    '^@rain-cafe/react-utils$': '<rootDir>/src/index.ts',
  },

  coverageProvider: 'v8',

  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', config],
  },

  collectCoverageFrom: ['<rootDir>/src/**/*'],
  coveragePathIgnorePatterns: ['__tests__'],
  setupFilesAfterEnv: ['@inrupt/jest-jsdom-polyfills', '@testing-library/jest-dom/matchers'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
} satisfies Config;
