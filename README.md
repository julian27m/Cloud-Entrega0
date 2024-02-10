# Entrega 0 - Desarrollo de Soluciones Cloud

## Desarrollo
Dentro de este repositorio se encuentra el backend y frontend del proyecto de nivelación de Desarrollo de Soluciones Cloud.
El backend fue construido como una API REST utilizando Python y el framework Flask.
Por otro lado, el frontend que consume la API REST fue creado con Angular.

### Ambiente de desarrollo Backend
Para desarrollar la aplicación en un entorno local se utilizó un ambiente virtual de python.
Pasos a seguir para instalar el mismo ambiente:
1. Asegurarse de estar en el directorio general del proyecto.
2. Ejecutar el siguiente comando en la terminal: .\venv\Scripts\activate
3. Una vez se inicie el ambiente virtual es necesario instalar los paquetes necesarios, para ello ejecute el siguiente comando en la terminal: pip install -r requirements.txt
4. Cuando todos los paquetes terminen de instalar, pueden ejecutar el siguiente comando en la terminal para iniciar el backend: flask run

### Ambiente de desarrollo Frontend
Para desplegar el frontend es necesario seguir estos pasos:
1. Dirigirse a la carpeta frontend dentro del proyecto: cd frontend
2. Instalar el paquete de Angular para evitar errores de compatibilidad: npm install angular
3. Desplegar el frontend: ng serve
