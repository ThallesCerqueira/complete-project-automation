// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';   // 1. importar

const testDir = defineBddConfig({                    // 2. gerar o testDir do BDD
  paths: ['tests/features/**/*.feature'],
  require: ['tests/steps/**/*.js'],
  importTestFrom: './support/fixtures.js',  
});

export default defineConfig({
  testDir,                                            // 3. trocar './tests' por testDir
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: "http://localhost:3001"
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});