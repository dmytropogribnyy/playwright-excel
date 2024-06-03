import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 120000,  // Global timeout set to 2 minutes
  retries: 2,
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,  // Action timeout set to 15 seconds
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chrome Browser',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  reporter: [
    ['list'],  // Outputs test results to console
    ['junit', { outputFile: 'results.xml' }],  // Generates JUnit XML report
    ['html', { outputFolder: 'playwright-report', open: 'never' }]  // Generates HTML report
  ],
};

export default config;
