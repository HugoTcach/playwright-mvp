import { Page, Locator } from '@playwright/test';

export class DragDropPage {
  readonly page: Page;
  readonly elementoOrigen: Locator;
  readonly zonaDestino: Locator;

  constructor(page: Page) {
    this.page = page;
    // Localizadores estructurales deterministas
    this.elementoOrigen = page.locator('#draggable');
    this.zonaDestino = page.locator('#droppable');
  }

  async navegar() {
    // Migramos a un entorno de pruebas estable y estandarizado
    await this.page.goto('https://testautomationpractice.blogspot.com/');
  }

  /**
   * Ejecuta la secuencia completa de Drag & Drop gestionando internamente 
   * el cálculo de coordenadas y eventos del ratón.
   */
  async arrastrarYSoltar() {
    await this.elementoOrigen.dragTo(this.zonaDestino);
  }
}