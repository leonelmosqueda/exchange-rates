const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://192.168.0.19:8080/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
