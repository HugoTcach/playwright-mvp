import { Page, Locator, expect } from '@playwright/test';

export class UploadPage {
  readonly page: Page;
  readonly inputFichero: Locator;
  readonly btnSubir: Locator;
  readonly panelExito: Locator;

  constructor(page: Page) {
    this.page = page;
    // Localizadores deterministas
    this.inputFichero = page.locator('#file-upload');
    this.btnSubir = page.locator('#file-submit');
    this.panelExito = page.locator('#uploaded-files');
  }

  async navegar() {
    await this.page.goto('https://the-internet.herokuapp.com/upload');
  }

  /**
   * Inyecta la ruta del archivo directamente en el DOM, bypassando el SO.
   */
  async adjuntarArchivo(rutaAbsoluta: string) {
    await this.inputFichero.setInputFiles(rutaAbsoluta);
  }

  async confirmarSubida() {
    await this.btnSubir.click();
  }

  async verificarArchivoSubido(nombreArchivo: string) {
    await expect(this.panelExito).toContainText(nombreArchivo);
  }
}