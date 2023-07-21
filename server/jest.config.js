/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "@server/(.*)": "<rootDir>/src/$1",
        "@tests/(.*)": "<rootDir>/tests/$1"
    }
};