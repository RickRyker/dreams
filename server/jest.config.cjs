// server/jest.config.ts
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  testEnvironment: "node",
  roots: ["<rootDir>/test"],
  moduleNameMapper: {
    "^@auth/(.*)$": "<rootDir>/src/auth/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@email/(.*)$": "<rootDir>/src/email/$1",
    "^@prisma$": "<rootDir>/src/db/client.ts",
    "^@shared/(.*)$": "<rootDir>/../shared/$1"
  }
};

module.exports = config;
