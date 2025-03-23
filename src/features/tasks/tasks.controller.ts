import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskData, TaskDto } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  async create(@Body() task: TaskDto): Promise<TaskData> {
    return await this.taskService.create(task);
  }

  @Get()
  async getAll(): Promise<TaskData[]> {
    return this.taskService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<TaskData> {
    return this.taskService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: TaskDto): Promise<TaskData> {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<TaskData> {
    return this.taskService.delete(id);
  }
}
