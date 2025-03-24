import { model, Schema } from 'mongoose';
import { ProjectData } from './projects.model';

export const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    participants: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: 'Task',
    },
  },
  { timestamps: true },
);

export const ProjectModel = model<ProjectData>('Projects', ProjectSchema);
