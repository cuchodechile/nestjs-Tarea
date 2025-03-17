FROM node:18-alpine

WORKDIR /app

# Instalar NestJS CLI globalmente
RUN npm install -g @nestjs/cli

COPY back-nest/package.json /app
RUN npm install
COPY back-nest/ /app

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
