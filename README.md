# Entrega 0 - Desarrollo de Soluciones Cloud

## Desarrollo
Dentro de este repositorio se encuentra el backend y frontend del proyecto de nivelación de Desarrollo de Soluciones Cloud.
El backend fue construido como una API REST utilizando Python y el framework Flask.
Por otro lado, el frontend que consume la API REST fue creado con Angular.

## Despliegue Local
### Ambiente de desarrollo Backend
Para desarrollar la aplicación en un entorno local se utilizó un ambiente virtual de python.
Pasos a seguir para instalar el mismo ambiente:
1. Asegurarse de estar en el directorio general del proyecto.
2. Crear un ambiente virtual de python: py -m venv venv
3. Ejecutar el siguiente comando en la terminal: .\venv\Scripts\activate
4. Una vez se inicie el ambiente virtual es necesario instalar los paquetes necesarios, para ello ejecute el siguiente comando en la terminal: pip install -r requirements.txt
5. Cuando todos los paquetes terminen de instalar, pueden ejecutar el siguiente comando en la terminal para iniciar el backend: flask run

### Ambiente de desarrollo Frontend
Para desplegar el frontend es necesario seguir estos pasos:
0. En la ruta frontend\src\environments\environment.ts se encuentra un archivo con la dirección de la MV de AWS y la del servidor local, dependiendo de qué tipo de prueba se hagan. Para este caso, por favor utilizar: apiUrl: 'http://localhost:5000' y comentar apiUrl: 'http://http://3.92.66.67:8080'. (Explicado en el video)
1. Dirigirse a la carpeta frontend dentro del proyecto: cd frontend
2. Instalar el paquete de Angular para evitar errores de compatibilidad: npm install
3. Desplegar el frontend: ng serve

## Despliegue en Cloud:
Lastimosamente no me funcionó el empaquetamiento del frontend de la aplicación en Docker. Sin embargo, el backend está funcionando adecuadamente dentro de mi máquina virtual en AWS, cuya dirección ip (no elástica) es http://3.92.66.67:8080
En el video explico el funcionamiento del servidor en la máquina virtual, qué falla y qué no.
