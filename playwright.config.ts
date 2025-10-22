import { defineConfig, devices } from '@playwright/test';
import type {TestOptions } from './test-options';

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();

export default defineConfig<TestOptions>({
 
  /* Retry on CI "Continuous Integration" only */
  //retries: process.env.CI ? 2 : 1, //If the test fails, we want to retry it once. If it fails again, then we mark it as failed.
  retries: 1, //We want to retry our tests once on CI. Locally, we don't want to retry our tests.
  
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined, //We want to run our tests one by one. We don't want to run them in parallel.
  //Or, we can use this:
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //Below is considered the "Global Section"
  reporter: 'html',
  use: {
    // baseURL: 'http://localhost:3000',
   // baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.dev === '1' ? 'http://localhost:4200/'
      : process.env.staging === '1' ? 'http://localhost:4200/'
      : 'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    }
  },

  //Below is considered the "Project Section"
  /* Configure projects for major browsers */
  projects: [
   {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4201/'
      },
    },

    /*{
      name: 'staging',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4202/'
      },
    },
    */

    {
      name: 'chromium',
      //Commenting the next lione since Chromium is the default browser already.
      //use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        video: {
        mode: 'on',
        size: { width: 1920, height: 1080 } }
      }
      //use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'pageObjectFulklScreen',
      testMatch: 'usePageObjectsVERSION3.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 },
      }
    },

    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }
    },
    /*
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
      }
      //use: { ...devices['Desktop Safari'] },
    },
    */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
