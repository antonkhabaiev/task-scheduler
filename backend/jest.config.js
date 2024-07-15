module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // If your TypeScript files are in a specific directory, you might want to add the roots option
    // roots: ['<rootDir>/src'],
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // Use this if you are using ES modules syntax in your TypeScript files
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    // If you are using Jest 27 or newer, you might need to explicitly set the test runner
    // testRunner: 'jest-circus/runner',
    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};