import { Page, Locator } from '@playwright/test';

export class AlertsPage {
  readonly page: Page;
  readonly simpleAlertBtn: Locator;
  readonly confirmAlertBtn: Locator;
  readonly promptAlertBtn: Locator;
  readonly notificationName: Locator;

  constructor(page: Page) {
    this.page = page;
    // Localizadores por ID para mayor resiliencia
    this.simpleAlertBtn = page.locator('#accept');
    this.confirmAlertBtn = page.locator('#confirm');
    this.promptAlertBtn = page.locator('#prompt');
    this.notificationName = page.locator('#myName');
  }

  async navegar() {
    await this.page.goto('https://letcode.in/alert');
  }

  /**
   * Prepara a Playwright para interceptar el PRÓXIMO diálogo nativo que aparezca.
   * Debe llamarse SIEMPRE antes de la acción que dispara la alerta.
   */
  async prepararIntercepcionDialogo(textoInyectar?: string) {
    this.page.once('dialog', async dialog => {
      // Si el diálogo es un 'prompt' y requiere texto, lo inyecta antes de aceptar
      if (textoInyectar) {
        await dialog.accept(textoInyectar);
      } else {
        await dialog.accept();
      }
    });
  }
}