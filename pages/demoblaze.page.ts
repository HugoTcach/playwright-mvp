import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model para el flujo de compra basico en DemoBlaze.
 * Cubre: navegacion por categoria, seleccion de producto,
 * agregado al carrito (con manejo del dialogo nativo de confirmacion)
 * y validacion de la vista de carrito.
 */
export class DemoblazePage {
  readonly page: Page;

  // Catalogo / navegacion
  readonly laptopsCategoryLink: Locator;
  readonly sonyVaioProductLink: Locator;
  readonly addToCartLink: Locator;
  readonly cartNavLink: Locator;

  // Carrito
  readonly placeOrderBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Localizadores semanticos extraidos de la exploracion manual
    this.laptopsCategoryLink = page.getByRole('link', { name: 'Laptops' });
    this.sonyVaioProductLink = page.getByRole('link', { name: 'Sony vaio i5' });
    this.addToCartLink = page.getByRole('link', { name: 'Add to cart' });
    this.cartNavLink = page.getByRole('link', { name: 'Cart', exact: true });

    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async navigateToLaptopsCategory() {
    await this.laptopsCategoryLink.click();
  }

  async selectSonyVaioProduct() {
    await this.sonyVaioProductLink.click();
  }

  /**
   * Hace clic en "Add to cart" y acepta el dialogo nativo de confirmacion
   * que dispara DemoBlaze al agregar un producto.
   *
   * El listener se registra con page.once('dialog', ...) ANTES del click
   * para garantizar que Playwright intercepte el dialogo en el instante
   * en que aparece, evitando que quede bloqueado esperando una interaccion
   * manual que nunca llega.
   */
  async addProductToCart() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.addToCartLink.click();
  }

  async goToCart() {
    await this.cartNavLink.click();
  }

  async expectPlaceOrderButtonEnabled() {
    await expect(this.placeOrderBtn).toBeEnabled();
  }
}
