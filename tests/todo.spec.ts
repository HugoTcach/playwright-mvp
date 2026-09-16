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

test.describe('US-102 | Filtrado y Gestión de Tareas', () => {
  let todoPage: TodoPage;

  const activeTask = 'Comprar insumos de oficina';
  const completedTask = 'Enviar reporte semanal';

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();

    await todoPage.addTodo(activeTask);
    await todoPage.addTodo(completedTask);
    await todoPage.completeTodo(completedTask);
  });

  // AC1
  test('Dado tareas activas y completadas, cuando filtro por "Active", entonces solo veo las no completadas', async () => {
    await todoPage.filterByActive();

    await todoPage.expectVisibleTodos([activeTask]);
  });

  // AC2
  test('Dado tareas activas y completadas, cuando filtro por "Completed", entonces solo veo las hechas', async () => {
    await todoPage.filterByCompleted();

    await todoPage.expectVisibleTodos([completedTask]);
  });

  // AC3
  test('Dado una tarea completada, cuando hago clic en "Clear completed", entonces se elimina del DOM', async () => {
    await todoPage.clearCompleted();

    await todoPage.expectTodoRemoved(completedTask);
    await todoPage.expectVisibleTodos([activeTask]);
  });

  // AC4
  test('Dado que no existen tareas completadas, entonces "Clear completed" está oculto o deshabilitado', async () => {
    await todoPage.clearCompleted();

    await todoPage.expectClearCompletedNotAvailable();
  });
});
