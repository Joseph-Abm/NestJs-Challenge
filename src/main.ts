import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['cookiesecret'],
    maxAge: 3600000 //3600000 ms = 1 h
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:8080'
  });

  await app.listen(3000);
}
bootstrap();
