import { test } from '@playwright/test';
import { DemoblazePage } from '../pages/demoblaze.page';

test.describe('US-104: Flujo de compra basico en DemoBlaze', () => {

  // Escenario 1: Agregar producto y visualizar opcion de compra
  test('agregar una laptop al carrito habilita el boton "Place Order"', async ({ page }) => {
    const demoblaze = new DemoblazePage(page);

    await demoblaze.goto();
    await demoblaze.navigateToLaptopsCategory();
    await demoblaze.selectSonyVaioProduct();
    await demoblaze.addProductToCart();
    await demoblaze.goToCart();

    await demoblaze.expectPlaceOrderButtonEnabled();
  });
});
