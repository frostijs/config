export default {
  // The root directory that Jest should scan for tests and modules within
  rootDir: '../',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src', '<rootDir>/test'],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: '<rootDir>/coverage',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['lcov'],

  // A glob pattern relative to matching the files that coverage info needs to be collected from
  collectCoverageFrom: ['<rootDir>/src/**'],

  // Modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['<rootDir>/test/_setup.js'],

  // Regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  moduleNameMapper: {
    '\\.(css|scss|styl|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js'
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true
};
