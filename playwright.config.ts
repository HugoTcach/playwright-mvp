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
  workers: process.env.CI ? 1 : undefined,
  
  /* HITO 7: Multi-Reporter (HTML para el humano, JUnit XML para enviar a Jira/Xray) */
  reporter: [
    ['html'], 
    ['junit', { outputFile: 'test-results/xray-report.xml' }]
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* HITO 7: Recolección de Evidencia Forense Automática */
    trace: 'retain-on-failure',     // Guarda el DOM y la red solo si el test falla
    screenshot: 'only-on-failure',  // Toma una foto en el instante exacto del error
    video: 'retain-on-failure',     // Guarda la grabación de pantalla del test fallido
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