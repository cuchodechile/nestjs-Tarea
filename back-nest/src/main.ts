import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// agregar doc para la api con swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación de mi API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // agrego para probar con web
  app.enableCors({
    origin: '*', // Permitir cualquier origen (para pruebas, en producción usa dominios específicos)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
  });


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

