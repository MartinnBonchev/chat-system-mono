import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // NestJS app configuration
  app.enableCors();

  await app.listen(8080);
}
bootstrap();
