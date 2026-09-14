import { test, expect } from '@playwright/test';
import { CardholdersPage } from '../pages/cardholders.page';

test('búsqueda de cardholder existente', async ({ page }) => {
  const cardholders = new CardholdersPage(page);

  await cardholders.goto();
  await cardholders.search('12345');

  const row = cardholders.rowFor('12345');
  await expect(row).toBeVisible();
});