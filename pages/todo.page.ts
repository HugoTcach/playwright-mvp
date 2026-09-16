import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoTitles: Locator;
  readonly todoCount: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;
  readonly allFilter: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selectores semánticos basados en los atributos reales de TodoMVC
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoTitles = page.getByTestId('todo-title');
    this.todoCount = page.getByTestId('todo-count');

    // US-102: filtros y gestión de tareas completadas
    this.allFilter = page.getByRole('link', { name: 'All' });
    this.activeFilter = page.getByRole('link', { name: 'Active' });
    this.completedFilter = page.getByRole('link', { name: 'Completed' });
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto(): Promise<void> {
    // Un string vacío respeta estrictamente el BASE_URL inyectado
    await this.page.goto('');
  }

  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async expectTodoAdded(text: string): Promise<void> {
    // Verifica que exista un elemento en la lista con ese texto exacto
    await expect(this.todoTitles.filter({ hasText: text })).toBeVisible();
  }

  async expectCounterText(text: string): Promise<void> {
    await expect(this.todoCount).toContainText(text);
  }

  /** Localiza el item de la lista (checkbox + label) que contiene el texto dado. */
  private todoItem(text: string): Locator {
    return this.page.getByRole('listitem').filter({ hasText: text });
  }

  /** Marca como completada la tarea con el texto indicado. */
  async completeTodo(text: string): Promise<void> {
    await this.todoItem(text).getByRole('checkbox').check();
  }

  async filterByActive(): Promise<void> {
    await this.activeFilter.click();
  }

  async filterByCompleted(): Promise<void> {
    await this.completedFilter.click();
  }

  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  /** AC1/AC2: verifica que la lista visible sea exactamente el conjunto de textos dado (sin orden). */
  async expectVisibleTodos(texts: string[]): Promise<void> {
    await expect(this.todoTitles).toHaveCount(texts.length);
    for (const text of texts) {
      await expect(this.todoTitles.filter({ hasText: text })).toBeVisible();
    }
  }

  /** AC3: la tarea ya no existe en el DOM. */
  async expectTodoRemoved(text: string): Promise<void> {
    await expect(this.todoTitles.filter({ hasText: text })).toHaveCount(0);
  }

  /** AC4: sin tareas completadas, el botón debe estar oculto o deshabilitado. */
  async expectClearCompletedNotAvailable(): Promise<void> {
    const button = this.clearCompletedButton;
    if (await button.count() === 0) {
      return;
    }
    const isHidden = await button.isHidden();
    const isDisabled = isHidden ? false : await button.isDisabled();
    expect(isHidden || isDisabled).toBeTruthy();
  }

  async expectClearCompletedAvailable(): Promise<void> {
    await expect(this.clearCompletedButton).toBeVisible();
    await expect(this.clearCompletedButton).toBeEnabled();
  }
}
