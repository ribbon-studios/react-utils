import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },

  collectCoverageFrom: ['<rootDir>/src/**/*'],

  coveragePathIgnorePatterns: ['__tests__'],

  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};

export default jestConfig;
