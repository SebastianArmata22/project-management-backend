import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseHelper } from './core/database/database';
import { ProjectsModule } from './features/projects/projects.module';
import { UsersModule } from './features/users/users.module';
import { TasksModule } from './features/tasks/tasks.module';

@Module({
  imports: [
    ProjectsModule,
    UsersModule,
    TasksModule,
    MongooseModule.forRoot(DatabaseHelper.getURL(), DatabaseHelper.getConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
