# US-104: Flujo de compra básico en DemoBlaze

**Como** usuario de DemoBlaze
**Quiero** navegar por el catálogo y agregar una laptop a mi carrito
**Para** poder iniciar el proceso de orden de compra

## Criterios de Aceptación

**Escenario 1: Agregar producto y visualizar opción de compra**
- **Dado** que el usuario se encuentra en la página de inicio (https://www.demoblaze.com/)
- **Cuando** navega a la categoría "Laptops"
- **Y** selecciona el producto "Sony vaio i5"
- **Y** hace clic en "Add to cart" y acepta la alerta nativa de confirmación
- **Y** navega a la vista del carrito ("Cart")
- **Entonces** el sistema debe mostrar el botón "Place Order" habilitado