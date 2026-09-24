import { Page, Locator } from '@playwright/test';

export class AlertsPage {
  readonly page: Page;
  
  // 1. Encapsulamiento: Locadores de interacción privados para proteger el POM
  private readonly simpleAlertBtn: Locator;
  private readonly confirmAlertBtn: Locator;
  private readonly promptAlertBtn: Locator;
  
  // Se mantiene público temporalmente porque tu test lo evalúa en un expect()
  readonly notificationName: Locator;

  constructor(page: Page) {
    this.page = page;
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
      if (textoInyectar) {
        await dialog.accept(textoInyectar);
      } else {
        await dialog.accept();
      }
    });
  }

  /**
   * 2. Bypass Arquitectónico:
   * Al aplicar force: true, ignoramos los banners de cookies dinámicos 
   * de terceros (fc-dialog-overlay) que bloquean la visibilidad en WebKit.
   */
  async dispararAlertaPrompt() {
    await this.promptAlertBtn.click({ force: true });
  }
}