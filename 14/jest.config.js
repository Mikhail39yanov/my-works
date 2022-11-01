/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    '\\.js$': 'babel-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
}