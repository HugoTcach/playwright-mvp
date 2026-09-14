import { Page } from '@playwright/test';

export class CardholdersPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/cardholders');
  }

  async search(id: string) {
    await this.page.getByLabel('Search cardholder').fill(id);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  rowFor(id: string) {
    return this.page.getByRole('row').filter({ hasText: id });
  }
}