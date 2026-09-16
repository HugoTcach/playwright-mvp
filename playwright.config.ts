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
  // En CI se recomienda limitar los workers a 2 para evitar problemas de memoria y concurrencia
  workers: process.env.CI ? 2 : undefined, 
  
  /* HITO 7: Configuración Dinámica de Reporteros (Local vs Nube) */
  reporter: process.env.CI
    ? [
        // 1. Integración nativa con PRs de GitHub
        ['github'], 
        // 2. Reporte humano, pero sin abrirse automáticamente en el servidor
        ['html', { open: 'never' }], 
        // 3. XML para Xray: Se incrustan las capturas en Base64 directamente en el archivo
        ['junit', { 
          outputFile: 'playwright-report/results.xml',
          embedAnnotationsAsProperties: true 
        }],
        // 4. Blob: Formato crudo obligatorio para unificar reportes tras el Sharding
        ['blob'] 
      ]
    : [
        // Configuración para el entorno local del QA
        ['html', { open: 'on-failure' }],
        ['junit', { outputFile: 'test-results/xray-report.xml' }]
      ],
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* HITO 7: Recolección de Evidencia Forense Automática */
    // En CI, solo guardamos el trace completo a partir del primer reintento fallido para ahorrar espacio
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