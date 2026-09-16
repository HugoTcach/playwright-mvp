import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object que modela el flujo de Swag Labs (saucedemo.com) cubierto
 * por la US-103: autenticación, inventario/carrito y checkout.
 */
export class SwagLabsPage {
  readonly page: Page;

  // --- Login (AC1 / AC2) ---
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // --- Inventario / Carrito (AC3) ---
  readonly inventoryTitle: Locator;
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;

  // --- Checkout: datos del comprador (AC4) ---
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  // --- Mensaje de error (compartido por login y checkout) ---
  readonly errorMessage: Locator;

  // --- Finalización de compra (AC5) ---
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.inventoryTitle = page.getByText('Products', { exact: true });
    /**
     * No existe un nombre accesible único para el badge del carrito (es solo
     * un número dentro de un ícono, sin texto ni rol distintivo). Se usa el
     * atributo data-test que la propia aplicación expone como hook oficial
     * de automatización: no es una clase de estilo frágil ni XPath, y es la
     * referencia más estable disponible para este elemento.
     */
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });

    /**
     * Tanto el error de login bloqueado como los errores de validación del
     * checkout se renderizan en el mismo componente de error de la app
     * (h3[data-test="error"]). Mismo criterio que el badge: hook oficial de
     * automatización, no una clase de estilo.
     */
    this.errorMessage = page.locator('[data-test="error"]');

    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.confirmationMessage = page.getByText('Thank you for your order!', { exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // AC1 / AC2
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** AC1: login exitoso redirige a /inventory.html */
  async expectRedirectedToInventory(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html$/);
    await expect(this.inventoryTitle).toBeVisible();
  }

  /** AC2: usuario bloqueado muestra un mensaje de error visible */
  async expectLoginBlockedError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText('locked out');
  }

  // AC3
  /**
   * Agrega un producto al carrito a partir de su slug data-test
   * (ej. "sauce-labs-backpack" para "Sauce Labs Backpack"). El botón
   * "Add to cart" se repite sin nombre accesible único en cada producto,
   * por lo que getByRole/getByText generarían ambigüedad; se usa el hook
   * data-test provisto por la propia aplicación.
   */
  async addProductToCart(productSlug: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
  }

  /** AC3: el contador del carrito refleja la cantidad agregada */
  async expectCartCount(count: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(count);
  }

  // AC4
  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /** Completa el formulario de checkout; los campos vacíos se omiten para forzar la validación. */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (postalCode) await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /** AC4: campos obligatorios vacíos muestran error de validación */
  async expectCheckoutValidationError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  // AC5
  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  /** AC5: la orden confirmada muestra el mensaje de éxito */
  async expectOrderConfirmation(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible();
  }
}
