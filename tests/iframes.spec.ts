import { test } from '@playwright/test';
import { IframesPage } from '../pages/iframes.page';

// Datos de prueba aislados
const TEST_DATA = {
  nombre: 'Hugo',
  apellidoPadre: 'QA-Automation',
  emailHijo: 'test-interno@enterprise.com'
};

test.describe('Fase 1: Interacciones Avanzadas de UI', () => {
  let iframesPage: IframesPage;

  test.beforeEach(async ({ page }) => {
    // Instanciamos el Page Object antes de cada prueba
    iframesPage = new IframesPage(page);
    await iframesPage.navegar();
  });

  test('TC-01: Interacción con Iframes anidados (Contextos aislados)', async () => {
    // 1. Interacción en el Iframe padre
    await iframesPage.completarDatosPadre(TEST_DATA.nombre, TEST_DATA.apellidoPadre);

    // 2. Penetración e interacción en el Iframe hijo
    await iframesPage.completarDatosHijo(TEST_DATA.emailHijo);

    // 3. Aserción de Estado: Verificar la integridad de los datos en el padre
    await iframesPage.verificarNombrePadre(TEST_DATA.nombre);
  });
});