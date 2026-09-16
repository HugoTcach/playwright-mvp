import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/alerts.page';

const TEST_DATA = {
  nombrePrompt: 'Hugo SDET'
};

test.describe('Fase 1: Interacciones Avanzadas - Alertas', () => {
  let alertsPage: AlertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await alertsPage.navegar();
  });

  test('TC-02: Interceptar y completar un Prompt nativo', async () => {
    // 1. Armar la trampa: Activar el listener ANTES de hacer clic
    await alertsPage.prepararIntercepcionDialogo(TEST_DATA.nombrePrompt);

    // 2. Disparar la alerta: Hacer clic en el botón que abre el prompt
    await alertsPage.promptAlertBtn.click();

    // 3. Aserción: Verificar que la aplicación procesó el texto inyectado en el prompt
    await expect(alertsPage.notificationName).toContainText(TEST_DATA.nombrePrompt);
  });
});