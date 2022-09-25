# 🇦🇷 Artrends 📈

## Arquitectura 🏛

- **Workers**: trabajos programados para realizar _scraping_ o consultar servicios para actualizar datos de _trends_.

- **Backend**: servicio para consultar la base de datos de MongoDB y obtener los datos recabados por los _workers_.

- **Base de datos**: una instancia de MongoDB dónde se guardan
  los datos obtenidos de _trends_.

- **Redis**: una instancia de Redis dónde se guardan en memoria las respuestas a solicitudes durante un tiempo configurable para optimizar
  los tiempos de respuesta de los endpoints de la API.

- **Frontend**: aplicación que consume y presenta los datos obtenidos.

- **Traefik**: servicio de _proxy reverso_ que escucha en determinados puertos y lo redirige la petición al servicio correcto.

<br/>

## Correr el proyecto 🚀

En todos los casos es necesario como primer paso llenar las variables de entorno en los archivos _.env_ de backend y frontend.
En el caso de querer correr los _workers_, también tiene su propio archivo _.env_.

```
Para el desarrollo local no es necesario Traefik.
```

### Desarrollo local con Docker

- Mientras Docker esté corriendo ejecutar en la raíz del proyecto

  ```
  docker compose up
  ```

  La siguiente oportunidad, se puede correr desde el dashboard de la aplicación de Docker haciendo click en el ícono de play en el contenedor _artrends_.

Y eso es todo, con _compose_ se instalan todas las dependencias y levantan todos los servicios necesarios.

### Desarrollo local sin Docker

- Necesitamos una instancia de MongoDB y una de Redis corriendo localmente o en la nube. La URI de la base de datos y las configuraciones de Redis deben estar en las variables de entorno.

- Una vez tenemos las variables de entorno ingresamos en el backend, instalamos las dependencias y lo corremos.

  ```
  cd backend
  npm install
  npm run dev
  ```

#### Documentación de la API (Swagger)

```
Podemos encontrar la documentación de los endpoints de la API agregando /docs en la ruta dónde corra el backend.
```

Ejemplo:

`http://localhost:3500/docs`

<br />

- Por último, volvemos a la raíz, luego ingresamos a la carpeta del frontend, instalamos dependencias y lo corremos.

  ```
  cd ..
  cd frontend
  npm install
  npm run dev
  ```
