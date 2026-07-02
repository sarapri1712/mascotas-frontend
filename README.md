# TechSolutions Pet API — Portal de Gestión de Mascotas (Frontend)

## 📝 Descripción del Proyecto
Este repositorio contiene la interfaz gráfica de usuario (Cliente) desarrollada de forma semántica para interactuar con la API REST de gestión de mascotas. 

La aplicación se comunica de forma nativa y asíncrona con el servidor Backend para reflejar en tiempo real las operaciones CRUD (crear, listar y eliminar mascotas) sobre el catálogo centralizado.

---

## 🛠️ Tecnologías Utilizadas
* **HTML5 Semántico**:  (`<header>`, `<main>`, `<section>`, `<form>`, `<footer>`).
* **CSS3**: Maquetación estandarizada, limpia y con un enfoque completamente adaptativo (responsive).
* **JavaScript Vanilla (Fetch API)**

---

## 🚀 Despliegue e Instalación en Local

### Requisitos Previos
Asegúrate de tener instalada la extensión **Live Server** en tu Visual Studio Code para desplegar el servidor de desarrollo local del frontend.

### Pasos para Ejecutar:
1. Asegúrate de tener el servidor Backend encendido
2. En este proyecto, haz clic derecho sobre el archivo `frontend/index.html`.
3. Selecciona la opción **Open with Live Server** (o presiona el botón `Go Live` en la barra inferior de VS Code).
4. La aplicación web se abrirá automáticamente en tu navegador predeterminado en la dirección local

---

## 📋 Control de Errores e Historias de Usuario
La interfaz implementa de forma nativa el control visual requerido en la planificación:
* **Validación de Datos**: Comunicación con los esquemas de validación del backend al enviar el formulario.
* **Resiliencia de Conexión (`HU2`)**: Si el servidor backend está caído o apagado, la función asíncrona `loadPets()` captura el error mediante un bloque `try/catch` y renderiza dinámicamente un mensaje en color rojo dentro del contenedor indicando: *"No se pudo conectar con el servidor"*.
