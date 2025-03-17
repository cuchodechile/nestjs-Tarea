# Usa una imagen de Nginx como base
FROM nginx:alpine

# Copia los archivos de la aplicación Flutter Web al directorio de Nginx
COPY build/web /usr/share/nginx/html

# Exponer el puerto 80 para acceso a la web
EXPOSE 80

# Configurar el punto de entrada
CMD ["nginx", "-g", "daemon off;"]