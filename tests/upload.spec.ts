import { test } from '@playwright/test';
import { UploadPage } from '../pages/upload.page';
import path from 'path';

test.describe('Fase 1: Interacciones Avanzadas - Subida de Archivos', () => {
  let uploadPage: UploadPage;

  test.beforeEach(async ({ page }) => {
    uploadPage = new UploadPage(page);
    await uploadPage.navegar();
  });

  test('TC-04: Subir un archivo físico bypassing el sistema operativo', async () => {
    // 1. Preparar la ruta absoluta del archivo (usamos el package.json del proyecto)
    const nombreArchivo = 'package.json';
    const rutaArchivo = path.join(__dirname, '..', nombreArchivo);

    // 2. Acción de adjuntar archivo
    await uploadPage.adjuntarArchivo(rutaArchivo);

    // 3. Confirmar la operación
    await uploadPage.confirmarSubida();

    // 4. Aserción: Verificar que el servidor reconoció el archivo
    await uploadPage.verificarArchivoSubido(nombreArchivo);
  });
});