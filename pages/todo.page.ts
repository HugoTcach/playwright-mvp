import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoTitles: Locator;
  readonly todoCount: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selectores semánticos basados en los atributos reales de TodoMVC
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoTitles = page.getByTestId('todo-title'); 
    this.todoCount = page.getByTestId('todo-count');
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
}