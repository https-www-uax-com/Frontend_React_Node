# LINKS:

FRONTEND: https://github.com/https-www-uax-com/Frontend_React_Node_.git

BACKEND: https://github.com/https-www-uax-com/Backend_Springboot.git

SCRIPT: https://github.com/https-www-uax-com/Limpieza-de-datos-Python-.git

# PARTICIPANTES

Jaime López Díaz

Juan Manuel Rodriguez

Gwendal Saget

Marcos García Benito Bilbao

# Experiment Management Frontend

Este proyecto es el frontend de una aplicación React que visualiza e interactua de forma dinámica-visual en multiples pantallas con los diferentes datos post-limpieza pertenecientes una fuente(dataset) con la que se ha trabajado paralelamente(experimentos, laboratorios, investigadores y muestras) en el backend. La aplicación frontend se comunica con el backend para obtener el estado actual de los datos extraidos y mostrar los datos organizados conjuntamente por paneles en base a su relación, además están abiertos a modificacion en tiempo real.

Extra fantástico, se plantea un log-in(registro de usuario) basado en una gran variedad de campos conbenientemente diferenciado entre administrador e investigadores (diferenciandose la capacidad de gestión de los datos en esencia). Para los más interesados, SÍ, incluye su respectivo log-out.

## Tecnologías Utilizadas

- **React**: Framework de JavaScript para la construcción de interfaces de usuario.
- **Webpack**: Empaquetador de módulos que compila el código de React.
- **Babel**: Compilador de JavaScript que permite usar la sintaxis moderna de ES6+ y JSX.
- **Styled Components**: Para manejar estilos en componentes de React.
- **Axios**: Cliente HTTP para realizar solicitudes al backend.
- **React Router DOM**: Para manejar el enrutamiento dentro de la aplicación React.
- **Chart.js** y **React-Chartjs-2**: Para visualizar gráficas de los datos del Galton Board.

## Requisitos

Para ejecutar el frontend necesitas tener instalados:

- **Node.js** (versión recomendada: 14+)
- **npm** (gestor de paquetes incluido con Node.js)

## Instalación

1. Clona el repositorio del frontend en tu máquina local:

```bash
git clone https://github.com/tu-usuario/frontend-galton.git
```

2. Navega al directorio del proyecto:

```bash
cd frontend-experiment-management
```

3. Instala las dependencias del proyecto::

```bash
npm install
```

4- Clona el repositorio del frontend en tu máquina local:

```bash
npm start
```

## Estructura del Proyecto

- **src/**: Contiene el código fuente del proyecto.
- **components/**: Componentes reutilizables de React, como la visualización de la distribución.
- **pages/**: Páginas principales de la aplicación.
- **services/**: Funciones para interactuar con la API, como las llamadas a Axios para obtener los datos del backend.
- **App.js**: Punto de entrada principal de la aplicación React.
- **index.js**: Archivo de arranque de la aplicación que renderiza el componente raíz en el DOM.

## Relación entre Frontend y Backend

### -Backend

El backend, desarrollado en Spring Boot, expone una API REST que proporciona la información de un laboratorio, incluyendo muestras biológicas, experimentos compuestos de varias muestras, investigadores que gestionan varios experimentos y usuarios que consultaran datos biologicos de las muestras analizadas.
Como no, utiliza programación concurrente para la correcta y eficiente asignacion de datos trabajados a gran escala (basado en lo previamente mencionado).

### -Frontend

El frontend, construido con React, consume la API para obtener el estado y los datos de distribución de los diferentes experimentos, laboratorios, investigadores y muestras que han sido extraidas, asignadas y simuladas concurrentemente del dataset(previamente limpiado).

Proporciona una interfaz de usuario multi-pantalla para gestionar dichas entidades a las cuales se ha dotado de su propio componente de gestión con funcionalidades para crear, editar, eliminar y procesar registros.
Los componentes por si nofuese poco soportan paginación para manejar grandes conjuntos de datos de manera eficiente.
