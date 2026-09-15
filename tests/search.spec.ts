import { expect, test } from '@playwright/test';
import { CardholdersPage } from '../pages/cardholders.page';

// Mock de Fixtures: Separación estricta de datos vs lógica de prueba
const TEST_DATA = {
  validCardholderId: '12345',
  invalidCardholderId: '99999',
  validationErrorMessage: 'Please enter an ID'
};

test.describe('US-101 | Búsqueda de Cardholder', () => {
  let cardholdersPage: CardholdersPage;

  test.beforeEach(async ({ page }) => {
    cardholdersPage = new CardholdersPage(page);
    await cardholdersPage.goto();
  });

  test('búsqueda de cardholder existente', async () => {
    // Consumimos el dato desde nuestra estructura centralizada
    await cardholdersPage.searchById(TEST_DATA.validCardholderId); 
    
    await expect(cardholdersPage.resultsTable).toBeVisible();
  });

  test('muestra un error de validación al buscar con el campo de ID vacío', async () => {
    // Uso del dato inválido para la rotura intencional
    await cardholdersPage.searchById(TEST_DATA.invalidCardholderId); 

    await cardholdersPage.expectValidationError(TEST_DATA.validationErrorMessage);
  });

  test('no renderiza la tabla de resultados cuando la búsqueda está vacía', async () => {
    await cardholdersPage.submitEmptySearch();

    await cardholdersPage.expectValidationError(TEST_DATA.validationErrorMessage);
    await cardholdersPage.expectNoResultsTable();
  });
});