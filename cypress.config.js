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
    defaultCommandTimeout: 6000,
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      const envName = config.env.environment || "prod";

      const selectedEnv = environments[envName];

      if (!selectedEnv) {
        throw new Error(`The environment "${envName}" was not found!`);
      }

      config.baseUrl = selectedEnv.baseUrl;
      config.env.username = selectedEnv.username;
      config.env.password = selectedEnv.password;

      return config;
    },
    excludeSpecPattern: [
      '**/google.cy.js',
      '**/login-command.cy.js',
      '**/hillel-auto-links.cy.js',
      '**/registeration.cy.js'
    ],
  },
});
