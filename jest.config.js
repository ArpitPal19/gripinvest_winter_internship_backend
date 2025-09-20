
// export default {
//   testEnvironment: "node",
//   transform: {}, // disable babel transform
//   testMatch: ["**/__tests__/**/*.test.js"]
// };


export default {
  testEnvironment: "node",
  transform: {},   // don't transpile, just run as-is
  globalTeardown: "./jest.teardown.js"
};

