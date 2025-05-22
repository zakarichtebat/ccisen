import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CCISN API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuration CORS détaillée pour permettre les cookies
  app.enableCors({
    origin: ['http://localhost:5000', 'http://localhost:5173'], // Autorise les origines du frontend
    credentials: true, // Très important pour les cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
  });
  
  app.use(cookieParser()); // pour analyser les cookies

  await app.listen(3000);
}
bootstrap();
