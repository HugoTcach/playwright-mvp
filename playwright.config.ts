import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined, 
  
  reporter: process.env.CI
    ? [
        ['github'], 
        ['html', { open: 'never' }], 
        ['junit', { 
          outputFile: 'playwright-report/results.xml',
          embedAnnotationsAsProperties: true 
        }],
        ['blob'] 
      ]
    : [
        ['html', { open: 'on-failure' }],
        ['junit', { outputFile: 'test-results/xray-report.xml' }]
      ],
  
  use: {
    // Si estamos en CI y no hay BASE_URL definida, aseguramos un fallback o evitamos fallas de conexión vacías
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure', 
    screenshot: 'only-on-failure',  
    video: 'retain-on-failure',     
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
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
