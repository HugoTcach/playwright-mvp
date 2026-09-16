import { test, expect } from '@playwright/test';
import { DragDropPage } from '../pages/dragdrop.page';

test.describe('Fase 1: Interacciones Avanzadas - Mouse', () => {
  let dragDropPage: DragDropPage;

  test.beforeEach(async ({ page }) => {
    dragDropPage = new DragDropPage(page);
    await dragDropPage.navegar();
  });

  test('TC-03: Ejecutar acción de Arrastrar y Soltar (Drag & Drop)', async () => {
    // 1. Ejecución de la acción de negocio
    await dragDropPage.arrastrarYSoltar();

    // 2. Aserción de Estado: Verificar que la zona de destino reaccionó al evento
    // El texto del contenedor debe cambiar a "Dropped!" al finalizar la acción
    await expect(dragDropPage.zonaDestino).toContainText('Dropped!');
  });
});