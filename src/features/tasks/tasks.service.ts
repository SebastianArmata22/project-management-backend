import { Injectable } from '@nestjs/common';
import { TaskData, TaskDto } from './tasks.model';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  async getAll(): Promise<TaskData[]> {
    return this.taskRepository.getAll();
  }

  async getById(id: string): Promise<TaskData> {
    return this.taskRepository.getById(id);
  }

  async create(task: TaskDto): Promise<TaskData> {
    return this.taskRepository.create(task);
  }

  async update(id: string, task: TaskDto): Promise<TaskData> {
    return this.taskRepository.update(id, task);
  }

  async delete(id: string): Promise<TaskData> {
    return this.taskRepository.delete(id);
  }
}
