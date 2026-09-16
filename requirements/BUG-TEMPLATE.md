# Plantilla de Reporte de Defecto (Bug Report)

## Título: [ID-Historia] - [Breve descripción del fallo]

### Contexto del Fallo
* **Test fallido:** `[Ruta del archivo .spec.ts]`
* **Línea de código:** `[Línea exacta donde falló la aserción]`
* **Entorno:** `[Valor de BASE_URL]`

### Evidencia Adjunta (Obligatoria)
* [ ] Captura de pantalla en el momento del fallo (`screenshot.png`)
* [ ] Grabación de video de la ejecución (`video.webm`)
* [ ] Traza completa de Playwright (`trace.zip`)

### Descripción Técnica (Completada por el Agente Revisor)
1. **Comportamiento Esperado:** Según los criterios de aceptación, el sistema debía [Describir la aserción original].
2. **Comportamiento Actual:** El sistema devolvió el error [Pegar log de consola] / La interfaz mostró [Describir lo que se vio en la captura].

### Propuesta de Corrección (Opcional)
* Si es un problema de selectores, el agente sugerirá el nuevo selector.
* Si es un problema de la aplicación, este campo queda vacío para el desarrollador.