# 🇦🇷 Artrends 📈

## Arquitectura 🏛

- **Base de datos**: una instancia de MongoDB dónde se guardan
  los datos obtenidos de _trends_.

- **Workers**: trabajos programados para realizar _scraping_ o consultar servicios para actualizar datos de _trends_.

- **Backend**: servicio para consultar la base de datos de MongoDB y obtener los datos recavados por los _workers_.

- **Frontend**: aplicación que consume y presenta los datos obtenidos.

- **Traefik**: servicio de _proxy reverso_ que escucha en determinados puertos y lo redirige la petición al servicio correcto.

<br/>

## Correr el proyecto 🚀

En todos los casos es necesario como primer paso llenar las variables de entorno en los archivos _.env_ de backend y frontend.
En el caso de querer correr los _workers_, también tiene su propio archivo _.env_.

### Desarrollo local con Docker

- Mientras Docker esté corriendo ejecutar en la raíz del proyecto

  `docker compose up`

  La siguiente oportunidad, se puede correr desde el dashboard de la aplicación de Docker haciendo click en el ícono de play en el contenedor _artrends_.

Y eso es todo, con _compose_ se instalan todas las dependencias y levantan todos los servicios necesarios.

### Desarrollo local sin Docker

- Necesitamos una instancia de MongoDB corriendo localmente o utilizar alguna corriendo en un cloud como MongoDB Atlas. La URI
  de la base de datos debe estar en las variables de entorno.

- Ingresamos en el backend, instalamos las dependencias y lo corremos.

  ```
  cd backend
  npm install
  npm run dev
  ```

- Por último, volvemos a la raíz, luego ingresamos a la carpeta del frontend, instalamos dependencias y lo corremos.

  ```
  cd ..
  cd frontend
  npm install
  npm run dev
  ```
