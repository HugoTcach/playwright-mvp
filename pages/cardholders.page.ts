import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Page Object de la pantalla de búsqueda de Cardholders (US-101).
 * Ruta protegida: requiere sesión autenticada (AC1).
 */
export class CardholdersPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly validationError: Locator;
  readonly resultsTable: Locator;
  readonly noRecordsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Localizadores semánticos
    this.searchInput = page.getByLabel('Cardholder ID');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.validationError = page.getByRole('alert');
    this.resultsTable = page.getByRole('table');
    this.noRecordsMessage = page.getByText('No records found');
  }

  async goto(): Promise<void> {
    await this.page.goto('/cardholders');
    await expect(this.searchInput).toBeVisible();
  }

  // Método para el camino feliz y pruebas con datos
  async searchById(id: string): Promise<void> {
    await this.searchInput.fill(id);
    await this.searchButton.click();
  }

  // Método específico para disparar el caso negativo
  async submitEmptySearch(): Promise<void> {
    await this.searchInput.fill('');
    await this.searchButton.click();
  }

  // Validaciones (Aserciones encapsuladas)
  async expectValidationError(message: string): Promise<void> {
    await expect(this.validationError).toBeVisible();
    await expect(this.validationError).toHaveText(message);
  }

  async expectNoResultsTable(): Promise<void> {
    await expect(this.resultsTable).toBeHidden();
  }

  /** AC4: el ID no existe y se informa al operador. */
  async expectNoRecordsFound(): Promise<void> {
    await expect(this.noRecordsMessage).toBeVisible();
  }

  // Ubica la fila exacta del titular dentro de la tabla de resultados
  rowFor(id: string): Locator {
    return this.resultsTable.getByRole('row').filter({ hasText: id });
  }

  /**
   * AC2 + AC3: la tabla se muestra y la fila del ID buscado
   * expone el nombre del titular y su estado de cuenta.
   */
  async expectCardholderRow(id: string, name: string, status: string): Promise<void> {
    await expect(this.resultsTable).toBeVisible();

    const row = this.rowFor(id);
    await expect(row).toBeVisible();
    await expect(row).toHaveCount(1);
    await expect(row).toContainText(name);
    await expect(row).toContainText(status);
  }
}
