import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseHelper } from './core/database/database-helper';
import { ApiExceptionFilter } from './core/errors/api-exception-filter';
import { Database } from './database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await Database.connect(DatabaseHelper.getURL());

  app.useGlobalFilters(new ApiExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
