# Monitoreo UTEC - Sistema de Monitoreo de Parqueo Estudiantil

Este proyecto es un sistema web para el monitoreo en tiempo real del parqueo estudiantil de la **Universidad Tecnológica de El Salvador** mediante visión artificial computacional.

## Descripción

El sistema se conecta a un servidor que envía datos en tiempo real sobre el estado del parqueo, permitiendo visualizar:

- **Espacios disponibles**
- **Espacios ocupados**
- **Espacios obstruidos**

Toda la información se actualiza en tiempo real para brindar una experiencia precisa y eficiente.

## Tecnologías utilizadas

- **React.js**: Framework principal para la construcción de la interfaz de usuario.
- **jQuery**: Utilizado para ciertas operaciones de manipulación y comunicación con el servidor.
- **Tailwind CSS**: Para estilos rápidos y responsivos.
- **Vite**: Herramienta de desarrollo y build.

## Características principales

- **Login**: Acceso seguro para los usuarios autorizados.
- **Validación de acceso mediante verificación de Voucher**: Solo usuarios con un voucher válido pueden acceder al sistema.
- **Vista Home**: Muestra el estado en vivo del parqueo estudiantil, diferenciando espacios disponibles, ocupados y obstruidos.

## Estructura del proyecto

```
monitoreo-utec
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ utec.ico
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ img
│  │     └─ logo-utec.png
│  ├─ components
│  │  ├─ button
│  │  │  └─ Button.jsx
│  │  ├─ footer
│  │  │  └─ Footer.jsx
│  │  └─ logo
│  │     └─ Logo.jsx
│  ├─ main.jsx
│  └─ views
│     ├─ check-voucher
│     │  ├─ CheckVoucher.jsx
│     │  └─ styles
│     │     └─ checkvoucher.css
│     ├─ home
│     │  ├─ Home.jsx
│     │  └─ styles
│     │     └─ home.css
│     └─ login
│        ├─ Login.jsx
│        └─ styles
│           └─ login.css
└─ vite.config.js

```

## Instalación y uso

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/cruzito-x/monitoreo-utec.git
   cd monitoreo-utec
   ```
2. **Instalar dependencias**
   ```sh
   npm install
   ```
3. **Iniciar el servidor de desarrollo**
   ```sh
   npm run dev
   ```
4. **Construir para producción**
   ```sh
   npm run build
   ```

## Notas

- El sistema requiere conexión con el servidor de monitoreo para funcionar correctamente.
- Asegúrar de tener configurado el backend que envía la data en tiempo real.
- Desarrollado para la Universidad Tecnológica de El Salvador como parte del proceso de especialización en Ingeniería de Inteligencia Artificial.
