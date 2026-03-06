# Crédito Solidario - Admin Dashboard 🛠️

Este repositorio contiene el frontend del panel de administración de **Crédito Solidario**, una plataforma diseñada para gestionar productos, categorías, usuarios y pedidos de impacto social. La aplicación está construida con **Angular** y se comunica con una API REST para el control total del ecosistema solidario.

## 🚀 Tecnologías y Frameworks

* **Framework:** [Angular](https://angular.dev/) (v17/18+).
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/).
* **Estilo:** CSS nativo con una estructura de diseño limpia y profesional.
* **Comunicación:** `HttpClient` para el consumo de servicios API.
* **Seguridad:** Interceptores HTTP para el manejo de tokens de autenticación JWT.

## 📂 Estructura del Proyecto (`src/app`)

El proyecto está organizado por módulos de servicios, interfaces y páginas:

* **`services/`**: Lógica de comunicación con el backend.
* `auth.ts`: Gestión de inicio de sesión y persistencia de sesión.
* `producto-service.ts` / `products-service.ts`: CRUD de productos.
* `orders-service.ts`: Gestión de pedidos y estados.
* `dashboard-service.ts`: Obtención de métricas y estadísticas globales.


* **`pages/`**: Componentes de vista principal.
* `login-page/`: Acceso administrativo.
* `dashboard-page/`: Resumen visual de la actividad de la plataforma.
* `products-page/` & `products-create-page/`: Listado y creación de catálogo.
* `categories-page/`: Administración de categorías de productos.
* `users-page/`: Gestión de clientes y administradores.


* **`interfaces/`**: Contratos de datos para asegurar el tipado fuerte en toda la app (ej: `Product`, `Pedido`, `User`).

## ✨ Funcionalidades Administrativas

1. **Dashboard de Control:** Visualización de estadísticas clave sobre ventas, productos y usuarios registrados.
2. **Gestión de Inventario:** Control total sobre el catálogo, permitiendo añadir imágenes, descripciones, stocks y precios en puntos.
3. **Administración de Categorías:** Organización jerárquica de productos para facilitar la navegación del usuario.
4. **Control de Pedidos:** Visualización detallada de las compras realizadas por los usuarios y actualización de sus estados de entrega.
5. **Gestión de Usuarios:** Registro y administración de perfiles de clientes vinculados al sistema de crédito.
6. **Seguridad Integrada:** Interceptor de autenticación que adjunta automáticamente el token Bearer a todas las peticiones salientes.

## 🛠️ Configuración y Ejecución

### Requisitos

* Node.js y npm instalados.
* Angular CLI (`npm install -g @angular/cli`).

### Instalación

1. Clona el proyecto.
2. Instala las dependencias:
```bash
npm install

```


3. Configura el entorno en `src/environments/environment.ts` apuntando a la dirección de tu API.

### Ejecución

Para ejecutar el servidor y ver la aplicación en `http://localhost:4200/`:

```bash
ng serve -o

```


## 🔐 Seguridad

La aplicación utiliza un sistema de protección de rutas y un `AuthInterceptor` que asegura que solo los usuarios autenticados puedan realizar peticiones sensibles al servidor.

---

**Crédito Solidario Admin** - *Gestionando la solidaridad de manera eficiente.*
