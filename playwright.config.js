// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  worker : 5,

  timeout : 40*1000, //or 40000
    expect: {
      timeout : 5*1000
    },
    reporter :'html',
  use: {
    actionTimeout : 10*1000,
    navigationTimeout : 30*1000,
    headless : false,
    browserName :'chromium',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace : 'on',
    screenshot :'on'

  },

 
});

module.exports = config

