// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';
import { permission } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',

  retries :1,
  workers : 5,

  timeout : 40*1000, //or 40000
    expect: {
      timeout : 5*1000
    },
    reporter :'html',

    projects :[
      {
        name : "edge",
        use: {
            actionTimeout : 10*1000,
            navigationTimeout : 30*1000,
            headless : true,
            browserName :'chromium',
            /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
            ignoreHttpsErrors : true,
            trace : 'on',
            screenshot :'only-on-failure',
            ...devices['Pixel 9 Pro XL'],
            permission :['geolocation'],
          
          },

       },

       {
            name : "chrome",

            use: {
                actionTimeout : 10*1000,
              navigationTimeout : 30*1000,
              headless : false,
              browserName :'chromium',
              /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
              ignoreHttpErrors : true,
              trace : 'on',
              screenshot :'only-on-failure',
              viewport :{width :720, height:720},
              permission :['geolocation'],
              video :'only-on-failure',

            }



       }

    ],

  });

module.exports = config

