import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiExceptionFilter } from './core/errors/api-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ApiExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
