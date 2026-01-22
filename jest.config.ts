export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif|webp|avif)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
