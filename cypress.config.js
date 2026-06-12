const { defineConfig } = require("cypress");

const environments = {
  prod: {
    baseUrl: 'https://qauto.forstudy.space/',
    username: 'kureninovavika2@gmail.com',
    password: 'Test1234A',
  },
  buggy: {
    baseUrl: 'https://qauto2.forstudy.space/',
    username: 'vikatest@gmail.com',
    password: 'Test112233',
  },
};

module.exports = defineConfig({
  allowCypressEnv: false,

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    viewportWidth: 1200,
    viewportHeight: 768,
    browser: 'firefox',
    defaultCommandTimeout: 6000,
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      const envName = config.env.environment || "prod";
      const selectedEnv = environments[envName];

      if (!selectedEnv) {
        throw new Error(`The environment "${envName}" was not found!`);
      }

      // Default values from selected envirenment
      config.baseUrl = process.env.CYPRESS_BASE_URL || selectedEnv.baseUrl;
      config.env.username = process.env.CYPRESS_USER_EMAIL || selectedEnv.username;
      config.env.password = process.env.CYPRESS_USER_PASSWORD || selectedEnv.password;

      return config;
    },
    
    // Ignore specific test files
    excludeSpecPattern: [
      '**/google.cy.js',
      '**/login-command.cy.js',
      '**/hillel-auto-links.cy.js',
      '**/registeration.cy.js',
      '**/expenses.cy.js'
    ],
  },
});