import { expect, type Locator, type Page } from '@playwright/test';

export class CardholdersPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly validationError: Locator;
  readonly resultsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    // Localizadores semánticos
    this.searchInput = page.getByLabel('Cardholder ID'); 
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.validationError = page.getByRole('alert');
    this.resultsTable = page.getByRole('table');
  }

  async goto(): Promise<void> {
    await this.page.goto('/cardholders');
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

  // Método original que armaste para ubicar la fila exacta del titular
  rowFor(id: string) {
    return this.page.getByRole('row').filter({ hasText: id });
  }
}