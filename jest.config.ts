import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-playwright-preset',
  testEnvironment: 'jest-playwright-preset',
  testMatch: ['**/tests/**/*.test.ts'],
  setupFiles: ['dotenv/config'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};

export default config;
