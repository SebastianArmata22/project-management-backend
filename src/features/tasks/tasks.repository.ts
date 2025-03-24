import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'bson';
import { mongodbErrorHandler } from '../../core/errors/mongodb-error-handler';
import { TaskData, TaskDto } from './tasks.model';
import { TaskModel } from './tasks.schema';

@Injectable()
export class TasksRepository {
  async getAll(): Promise<TaskData[]> {
    return TaskModel.find().lean();
  }

  async getById(id: string): Promise<TaskData> {
    const task = await TaskModel.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'users',
        },
      },
    ]);
    if (!task.length) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return task[0] as TaskData;
  }
  async create(task: TaskDto): Promise<TaskData> {
    try {
      return await TaskModel.create(task);
    } catch (error) {
      mongodbErrorHandler(error);
    }
  }

  async update(id: string, task: TaskDto): Promise<TaskData> {
    try {
      const doc = await TaskModel.findOneAndUpdate({ _id: id }, task, { runValidators: true, new: true }).lean();
      if (!doc) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return doc;
    } catch (error) {
      mongodbErrorHandler(error);
    }
  }

  async delete(id: string): Promise<TaskData> {
    const deletedTask = await TaskModel.findByIdAndDelete(id).lean();
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return deletedTask;
  }
}
