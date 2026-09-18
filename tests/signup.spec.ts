import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';

test.describe('US-105: Flujo de Registro de Usuario (Sign Up) en DemoBlaze', () => {

  // AC1: Registro exitoso
  // Se anexa un timestamp aleatorio al username para garantizar que el
  // registro siempre sea exitoso en cada corrida, sin colisionar con
  // usuarios creados en corridas anteriores.
  test('AC1: registrar un usuario nuevo emite alerta de exito', async ({ page }) => {
    const signup = new SignupPage(page);
    const uniqueUsername = `qa_user_${Date.now()}`;
    const password = 'Password123!';

    await signup.goto();
    const alertMessage = await signup.signUp(uniqueUsername, password);

    expect(alertMessage).toContain('successful');
  });

  // AC2: Usuario existente
  // Para que el test sea estable en cualquier corrida (no depende de un
  // usuario pre-existente en el ambiente), primero se registra un usuario
  // con un username fijo (se ignora el resultado de este primer intento,
  // ya que puede ser "successful" la primera vez o "already exist" en
  // corridas posteriores) y luego se repite el registro con el mismo
  // username, que en ese segundo intento siempre debe fallar por duplicado.
  test('AC2: registrar un usuario que ya existe emite alerta de duplicado', async ({ page }) => {
    const signup = new SignupPage(page);
    const fixedUsername = 'qa_existing_user_us105';
    const password = 'Password123!';

    await signup.goto();
    await signup.signUp(fixedUsername, password);

    await signup.goto();
    const alertMessage = await signup.signUp(fixedUsername, password);

    expect(alertMessage).toContain('already exist');
  });
});
