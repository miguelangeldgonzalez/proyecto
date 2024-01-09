import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true 
    }
  }));

  const config = new DocumentBuilder()
    .setTitle('Proyecto Sirena')
    .setDescription('API de Poryecto Sirena')
    .setVersion('1.0')
    .addTag('sirena')
    .build()
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}

bootstrap();
