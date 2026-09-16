# US-102: Filtrado y Gestión de Tareas

**Como** usuario de la aplicación TodoMVC
**Quiero** filtrar las tareas por su estado (Active, Completed) y poder eliminarlas
**Para** organizar mis pendientes de manera eficiente.

## Criterios de Aceptación (AC)
1. Al tener tareas en estado activo y completado, hacer clic en la pestaña "Active" debe mostrar únicamente las tareas no completadas.
2. Hacer clic en la pestaña "Completed" debe mostrar únicamente las tareas marcadas como hechas.
3. El botón "Clear completed" debe eliminar del DOM todas las tareas que se encuentren en estado completado.
4. Si no existen tareas completadas, el botón "Clear completed" debe ocultarse o deshabilitarse.
