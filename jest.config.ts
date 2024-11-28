/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  // Automatically clear mock calls, instances, contexts, and results before every test
  clearMocks: true,

  // Collect coverage info while running tests
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  // The environment to simulate in Jest
  testEnvironment: 'jsdom',

  // Use ts-jest to transform TypeScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for .ts and .tsx files
  },

  // Support for `tsx` and `ts` extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Enable verbose test output
  verbose: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
