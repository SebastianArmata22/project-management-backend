import { ObjectId } from 'mongoose';
import { TaskStatus } from './task-status.enum';

export interface TaskData {
  title: string;
  description: string;
  priority: number;
  dueDate: Date;
  status: TaskStatus;
  users: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type TaskDto = Pick<TaskData, 'title' | 'description' | 'priority' | 'dueDate' | 'status' | 'users'>;
