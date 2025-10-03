/** @type {import('jest').Config} */
const config = {
  // Use Node.js environment for testing
  testEnvironment: "node",

  // Enable ES modules support
  transform: {},

  // Handle ES module imports
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },

  // Test file patterns
  testMatch: [
    "**/__tests__/**/*.js",
    "**/?(*.)+(spec|test).js"
  ],

  // Coverage configuration
  collectCoverageFrom: [
    "*.js",
    "!*.config.js",
    "!coverage/**",
    "!node_modules/**"
  ],

  // Coverage thresholds (optional)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Verbose output
  verbose: true
};
export default config;