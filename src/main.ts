import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PathMiddlewareMiddlewares, infologger } from './path-middleware/path-middleware.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  //*Una instancia de la aplicacion utilizando el AppModule como modulo principal
  const app = await NestFactory.create(AppModule);

  //*Documentacion con Swagger para la API
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Ecommerce M4')
  .setDescription('Documentacion de la API')
  .setVersion('1.0')
  .addBearerAuth()
  .build()//!Construye la configuracion de de Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  //localhost:3000/api

  //*Uso globales de los Pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map(error => {
        return {property: error.property, constraints: error.constraints}
      });
      return new BadRequestException({
        alert: "Se han detectado los siguientes errores",
        errors: cleanErrors
      })
    }
  }))

  //*Uso global de los middleware
  app.use(infologger)

  //*Puerto de ejecucion
  await app.listen(3000);
}
bootstrap();
