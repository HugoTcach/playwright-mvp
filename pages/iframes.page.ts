import { Page, FrameLocator, expect } from '@playwright/test';

export class IframesPage {
  readonly page: Page;
  readonly framePadre: FrameLocator;
  readonly frameHijo: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.framePadre = page.frameLocator('#firstFr');
    this.frameHijo = this.framePadre.frameLocator('iframe').first();
  }

  async navegar() {
    await this.page.goto('https://letcode.in/frame');
  }

  async completarDatosPadre(nombre: string, email: string) {
    await this.framePadre.getByPlaceholder('Enter name').fill(nombre);
    await this.framePadre.getByPlaceholder('Enter email').fill(email);
  }

  async completarDatosHijo(emailInterno: string) {
    await this.frameHijo.locator('input[name="email"]').fill(emailInterno);
  }

  async verificarNombrePadre(nombreEsperado: string) {
    await expect(this.framePadre.getByPlaceholder('Enter name')).toHaveValue(nombreEsperado);
  }
}