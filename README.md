# nestjs-Tarea
Este es un proyecto de laboratorio que permite tener un editor de notas por usuarios, esta hecho:

 - backend: nest js
 - Frontend: Flutter
 - Base de datos: postgres

Esta sobre docker

## Estructura de Directorio

 - back-nest: esta el codigo del backend
 - Collection: esta el json que define el collection para postman
 - app-ui: esta la aplicacion flutter de usuario

# Preparacion
Debes clonar el proyecto en algun directorio de tu computadora, revisa las rutas de los volumnes del docker-compose, solo esta para el nodejs
La base de datos es volatil, no tiene volumen (TODO: mejorar para tener persistencia)


## Construir y levantar el backend 
correr para construir

 - docker-compose up --build back-nest

 ## Ver docuemntacion de la API

 http://localhost:3000/api

## Usando REST API

Puedes utilizar Postman Para cargar las collecciones.

1. Antes de empezar debes crear un usuario  Puede usar create desde la pagina documentacion de la api.
```
curl -X 'POST' \
  'http://localhost:3000/auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "lolo@eldominio.com",
  "password": "1234567"
}'
``` 
2. Obtener un token 
```
curl -X 'POST' \
  'http://localhost:3000/auth/login' \
  -H 'accept: */*' \
  -d ''

```

## Para Construir el FrontEnd

 - Se debe construir un aplicacion Flutter 
 - Luego copiar los archivos y directorios del directorio *front-flutter* a la raiz del proyecto flutter
 - Compilar la aplicacion: flutter build web
 - Construir la imagen de Docker con el nombre "flutter": docker build -t flutter .  (usar DockerFile del directorio)


Ahora puedes levantar el proyecto con docker compose up -d

