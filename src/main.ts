import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 


async function start() {
  const app = await NestFactory.create(AppModule); 
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  await app.listen(3001);
}
start();
