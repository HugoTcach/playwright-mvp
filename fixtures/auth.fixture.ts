import { test as baseTest, expect as baseExpect } from '@playwright/test';

// 1. Declaramos el tipo de nuestro fixture personalizado
type AuthFixtures = {
  userPage: import('@playwright/test').Page;
};

// 2. Extendemos el objeto 'test' base de Playwright
export const test = baseTest.extend<AuthFixtures>({
  
  // Definimos cómo se construye 'userPage'
  userPage: async ({ browser }, use) => {
    // FASE DE SETUP: Crear un contexto de navegador virgen y aislado
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Ejecutar la rutina de autenticación (Ejemplo estándar con Swag Labs)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // FASE DE INYECCIÓN: Entregar la página ya logueada al test que la pida
    await use(page);

    // FASE DE TEARDOWN: Destruir el contexto de forma segura al terminar el test
    await context.close();
  }
});

// Exportamos el test extendido y el expect original
export const expect = baseExpect;