import { model, Schema } from 'mongoose';
import { TaskStatus } from './task-status.enum';
import { TaskData } from './tasks.model';

export const TasksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.OPEN,
      required: true,
    },
    users: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const TaskModel = model<TaskData>('Tasks', TasksSchema);
