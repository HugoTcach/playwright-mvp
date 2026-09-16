import { test, expect } from '@playwright/test';
import { SwagLabsPage } from '../pages/swag-labs.page';

const VALID_USER = 'standard_user';
const LOCKED_USER = 'locked_out_user';
const PASSWORD = 'secret_sauce';
const BACKPACK_SLUG = 'sauce-labs-backpack';

test.describe('US-103: Autenticación, validación de formularios y checkout en Swag Labs', () => {

  // AC1
  test('login exitoso con usuario estándar redirige al inventario', async ({ page }) => {
    const swagLabs = new SwagLabsPage(page);

    await swagLabs.goto();
    await swagLabs.login(VALID_USER, PASSWORD);

    await swagLabs.expectRedirectedToInventory();
  });

  // AC2
  test('login con usuario bloqueado muestra un mensaje de error visible', async ({ page }) => {
    const swagLabs = new SwagLabsPage(page);

    await swagLabs.goto();
    await swagLabs.login(LOCKED_USER, PASSWORD);

    await swagLabs.expectLoginBlockedError();
  });

  // AC3
  test('agregar un producto incrementa el contador del carrito a "1"', async ({ page }) => {
    const swagLabs = new SwagLabsPage(page);

    await swagLabs.goto();
    await swagLabs.login(VALID_USER, PASSWORD);
    await swagLabs.addProductToCart(BACKPACK_SLUG);

    await swagLabs.expectCartCount('1');
  });

  // AC4
  test.describe('validación de formulario de checkout', () => {
    let swagLabs: SwagLabsPage;

    test.beforeEach(async ({ page }) => {
      swagLabs = new SwagLabsPage(page);
      await swagLabs.goto();
      await swagLabs.login(VALID_USER, PASSWORD);
      await swagLabs.addProductToCart(BACKPACK_SLUG);
      await swagLabs.goToCheckout();
    });

    test('nombre vacío muestra error de validación', async () => {
      await swagLabs.fillCheckoutInfo('', 'Doe', '1000');
      await swagLabs.expectCheckoutValidationError();
    });

    test('apellido vacío muestra error de validación', async () => {
      await swagLabs.fillCheckoutInfo('John', '', '1000');
      await swagLabs.expectCheckoutValidationError();
    });

    test('código postal vacío muestra error de validación', async () => {
      await swagLabs.fillCheckoutInfo('John', 'Doe', '');
      await swagLabs.expectCheckoutValidationError();
    });
  });

  // AC5
  test('completar el checkout con datos válidos muestra la pantalla de éxito', async ({ page }) => {
    const swagLabs = new SwagLabsPage(page);

    await swagLabs.goto();
    await swagLabs.login(VALID_USER, PASSWORD);
    await swagLabs.addProductToCart(BACKPACK_SLUG);
    await swagLabs.goToCheckout();
    await swagLabs.fillCheckoutInfo('John', 'Doe', '1000');
    await swagLabs.finishOrder();

    await swagLabs.expectOrderConfirmation();
  });
});
