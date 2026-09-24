import { test, expect } from '../fixtures/auth.fixture';
import { SwagLabsPage } from '../pages/swag-labs.page';

test('US-106: Usuario autenticado puede agregar un producto al carrito', async ({ userPage }) => {
  const inventory = new SwagLabsPage(userPage);
  
  // Pasamos el slug estricto esperado por el data-test
  await inventory.addProductToCart('sauce-labs-backpack'); 
  await inventory.expectCartCount('1');
});