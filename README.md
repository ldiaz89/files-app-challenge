# files-app-challenge

Guía de Uso - Aplicación con API Express y Cliente React
Esta guía proporciona instrucciones paso a paso para ejecutar la aplicación que consta de una API construida con Express en la carpeta api y una aplicación React en la carpeta client. Asegúrate de seguir estos pasos en el orden especificado.

Configuración Inicial

1. Instalación de Dependencias
   En cada carpeta (api y client), ejecuta el siguiente comando para instalar las dependencias del proyecto:

bash
Copy code
npm install
API Express (Carpeta api) 2. Ejecución de la API
Dentro de la carpeta api, puedes utilizar los siguientes comandos:

Pruebas:

bash
Copy code
npm test
Inicio:

bash
Copy code
npm start
Este comando inicia la API Express.

Verificación de Estilo de Código (lint):

bash
Copy code
npm run lint
Modo Desarrollo con Recarga Automática:

bash
Copy code
npm run dev
Este comando ejecuta las pruebas, verifica el estilo y utiliza nodemon para recargar automáticamente la API durante el desarrollo.

Asegúrate de que la API esté en funcionamiento antes de proceder a la aplicación React.

Aplicación React (Carpeta client) 3. Ejecución de la Aplicación
Dentro de la carpeta client, puedes utilizar los siguientes comandos:

Pruebas:

bash
Copy code
npm test
Compilación y Inicio en Modo Desarrollo con Webpack Dev Server:

bash
Copy code
npm start
Este comando compila la aplicación React en modo desarrollo y la inicia con Webpack Dev Server.

Compilación en Modo Producción:

bash
Copy code
npm run build
Este comando compila la aplicación React en modo producción.

Modo Desarrollo con Webpack Dev Server:

bash
Copy code
npm run dev
Este comando inicia la aplicación en modo desarrollo con Webpack Dev Server.

Asegúrate de que la API Express esté en ejecución antes de lanzar la aplicación React, ya que la aplicación realiza solicitudes a la API.

Con estos pasos, deberías tener la API Express y la aplicación React funcionando correctamente. Abre tu navegador y visita http://localhost:3000 para interactuar con la aplicación React.
