module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/client/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        "\\.(css)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png)$": "identity-obj-proxy",
      },
}
