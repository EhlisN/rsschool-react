/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './src',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
    '^.+\\.module\\.css$': 'jest-transform-css',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/'],
  coveragePathIgnorePatterns: ['src/components/interfaces', 'src/index.tsx'],
};
