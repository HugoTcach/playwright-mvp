import { expect, test } from '@playwright/test';
import { CardholdersPage } from '../pages/cardholders.page';

// Mock de Fixtures: Separación estricta de datos vs lógica de prueba
const TEST_DATA = {
  validCardholder: {
    id: '12345',
    name: 'Jane Doe',
    status: 'Active'
  },
  unknownCardholderId: '99999',
  validationErrorMessage: 'Please enter an ID'
};

test.describe('US-101 | Búsqueda de Cardholder', () => {
  let cardholdersPage: CardholdersPage;

  test.beforeEach(async ({ page }) => {
    cardholdersPage = new CardholdersPage(page);
    await cardholdersPage.goto();
  });

  // Camino feliz: AC2 + AC3
  test('muestra la fila del cardholder con su nombre y estado al buscar un ID existente', async () => {
    const { id, name, status } = TEST_DATA.validCardholder;

    await cardholdersPage.searchById(id);

    await cardholdersPage.expectCardholderRow(id, name, status);
  });

  // AC4: ID inexistente
  test('muestra "No records found" al buscar un ID que no existe', async () => {
    await cardholdersPage.searchById(TEST_DATA.unknownCardholderId);

    await cardholdersPage.expectNoRecordsFound();
  });

  // Escenario negativo: campo vacío (comportamiento pendiente de confirmación del PO)
  test('muestra un error de validación al buscar con el campo de ID vacío', async () => {
    await cardholdersPage.submitEmptySearch();

    await cardholdersPage.expectValidationError(TEST_DATA.validationErrorMessage);
  });

  test('no renderiza la tabla de resultados cuando la búsqueda está vacía', async () => {
    await cardholdersPage.submitEmptySearch();

    await expect(cardholdersPage.validationError).toBeVisible();
    await cardholdersPage.expectNoResultsTable();
  });
});
