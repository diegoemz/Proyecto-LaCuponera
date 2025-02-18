# 🌟 Tienda de Cupones - React & Firebase

## ✨ Descripción del Proyecto
Bienvenido a la La Cuponera, una plataforma web desarrollada con **React JS** y **Firebase** que permite a los usuarios adquirir cupones de descuento en diversas categorías. Este proyecto forma parte de la fase 1, enfocada en la creación de la tienda sin el back-office del sistema.

## 🔧 Tecnologías Utilizadas
- **React JS** ✨ - Para la construcción de la interfaz de usuario.
- **Firebase** ⚡ - Para la autenticación de usuarios y almacenamiento de datos.
- **Firebase Authentication** 🔑 - Para el inicio de sesión y registro seguro de usuarios.
- **Firebase Firestore** 📚 - Base de datos para almacenar la información de los cupones y usuarios.
- **Bootstrap** 🌟 - Para mejorar el diseño y la responsividad de la interfaz.
- **React Router** 🌐 - Para la navegación entre páginas.

## 🔄 Funcionalidades
Para el primer avance del proyecto, se han implementado las siguientes funcionalidades:

- ✅ **Visualización de ofertas**: Los usuarios pueden explorar ofertas aprobadas y clasificadas por rubro.
- ✅ **Registro y autenticación**: Los clientes pueden registrarse y acceder a su cuenta de manera segura con Firebase Authentication.
- ✅ **Compra de cupones**: Los usuarios pueden comprar cupones de descuento.
- ✅ **Gestor de cupones**: Cada usuario puede ver los cupones adquiridos en su cuenta.
- ✅ **Canje de cupones**: Los empleados de las empresas pueden validar y canjear cupones.

## 🛠️ Instalación y Configuración
Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/Proyecto-LaCuponera.git
   cd tienda-cupones
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Firebase**:
   - Crea un proyecto en [Firebase](https://console.firebase.google.com/).
   - Habilita Firebase Authentication y Firestore.
   - Copia tu configuración de Firebase en un archivo `.env`:
     ```env
     REACT_APP_FIREBASE_API_KEY=tu_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=tu_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=tu_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=tu_app_id
     ```

4. **Ejecutar la aplicación**:
   ```bash
   npm start
   ```

## 🔎 Estructura del Proyecto
```plaintext
/public
  |-- img/         # Imagenes
/src
  |-- components/  # Componentes reutilizables
  |-- css/         # Estilos necesarios
  |-- firebase.js  # Configuración de Firebase
  |-- App.jsx      # Componente principal
  |-- main.jsx     # Punto de entrada de la app
```
