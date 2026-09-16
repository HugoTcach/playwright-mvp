import { test } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

// Mock de Fixtures: Datos aislados
const TEST_DATA = {
  taskName: 'Automatizar pruebas con IA a nivel Enterprise',
  expectedCounter: '1 item left'
};

test.describe('Aplicación de Tareas (TodoMVC)', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('debería permitir agregar una nueva tarea exitosamente', async () => {
    // 1. Acción: El usuario agrega la tarea
    await todoPage.addTodo(TEST_DATA.taskName);

    // 2. Aserción de Negocio: La tarea se renderiza en la lista
    await todoPage.expectTodoAdded(TEST_DATA.taskName);

    // 3. Aserción de Estado: El contador de tareas pendientes se actualiza
    await todoPage.expectCounterText(TEST_DATA.expectedCounter);
  });
});