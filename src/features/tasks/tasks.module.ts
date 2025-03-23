import { Module } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  providers: [TasksService, TasksRepository],
  controllers: [TasksController],
})
export class TasksModule {}
