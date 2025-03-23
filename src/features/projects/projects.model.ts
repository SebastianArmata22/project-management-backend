import { ObjectId } from 'mongoose';
import { TaskStatus } from '../tasks/task-status.enum';

export interface ProjectData {
  name: string;
  description: string;
  participants: ObjectId[] | { _id: ObjectId, name: string }[];
  tasks: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

type TaskCounts = Record<TaskStatus, number>;

export interface GroupedProjectData {
  name: string;
  description: string;
  taskCounts: TaskCounts;
}

export type ProjectDto = Pick<ProjectData, 'name' | 'description' | 'participants' | 'tasks'>;

export interface ProjectFilter {
  name?: string;
  taskStatus?: TaskStatus;
  search?: string;
  taskDueDate?: Date;
}
