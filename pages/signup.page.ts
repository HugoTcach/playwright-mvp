import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model para el flujo de registro (Sign Up) en DemoBlaze.
 * Cubre: apertura del modal de registro, completado del formulario
 * y envio del registro con manejo del dialogo nativo de resultado
 * ("Sign up successful." / "This user already exist.").
 */
export class SignupPage {
  readonly page: Page;

  readonly signUpNavLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Localizadores semanticos extraidos de la exploracion manual
    this.signUpNavLink = page.getByRole('link', { name: 'Sign up' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
    this.signUpSubmitButton = page.getByRole('button', { name: 'Sign up' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async openSignUpModal() {
    await this.signUpNavLink.click();
  }

  async fillSignUpForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  /**
   * Hace clic en el boton "Sign up" del modal y captura la alerta nativa
   * que dispara DemoBlaze al completar (o rechazar) el registro.
   *
   * El listener se registra con page.once('dialog', ...) ANTES del click
   * para garantizar que Playwright intercepte el dialogo en el instante
   * en que aparece, evitando que quede bloqueado esperando una interaccion
   * manual que nunca llega.
   *
   * Retorna el mensaje de la alerta para que el test pueda validarlo
   * (por ejemplo, contra "successful" o "already exist").
   */
  async submitSignUp(): Promise<string> {
    const alertMessage = new Promise<string>(resolve => {
      this.page.once('dialog', async dialog => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });

    await this.signUpSubmitButton.click();

    return alertMessage;
  }

  /**
   * Flujo completo: abre el modal, completa el formulario y envia el
   * registro, retornando el mensaje de la alerta resultante.
   */
  async signUp(username: string, password: string): Promise<string> {
    await this.openSignUpModal();
    await this.fillSignUpForm(username, password);
    return this.submitSignUp();
  }
}
