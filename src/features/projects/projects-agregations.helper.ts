import { BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../tasks/task-status.enum';
import { TasksSchema } from '../tasks/tasks.schema';
import { UserSchema } from '../users/users.schema';
import { ProjectFilter } from './projects.model';
import { ProjectSchema } from './projects.schema';

export const generateTaskCountsProjection = () => {
  const statuses = Object.values(TaskStatus);
  const taskCounts: Record<string, any> = {};

  statuses.forEach(status => {
    taskCounts[status] = {
      $size: {
        $filter: {
          input: '$tasks',
          as: 'task',
          cond: { $eq: ['$$task.status', status] },
        },
      },
    };
  });

  return [
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        taskCounts,
      },
    },
  ];
};

export const generateProjectsFilteredProjection = (filters: ProjectFilter) => {
  const matchStage: any = {};
  if (filters?.search) {
    const searchQuery = filters.search ? new RegExp(filters.search, 'i') : null;
    const schemas = [
      { schema: ProjectSchema, prefix: '' },
      { schema: UserSchema, prefix: 'participants.' },
      { schema: TasksSchema, prefix: 'tasks.' },
    ];

    const stringFields = schemas.flatMap(({ schema, prefix }) =>
      Object.keys(schema.paths)
        .filter(key => schema.paths[key].instance === 'String')
        .map(key => `${prefix}${key}`),
    );

    if (searchQuery) {
      matchStage.$or = stringFields.map(field => ({
        [field]: searchQuery,
      }));
    }
  }

  if (filters?.taskStatus) {
    matchStage['tasks.status'] = filters.taskStatus;
  }

  if (filters?.taskDueDate) {
    const taskDueDate = new Date(filters.taskDueDate);
    if (!isNaN(taskDueDate.getTime())) {
      matchStage['tasks.dueDate'] = { $lte: taskDueDate };
    } else {
      throw new BadRequestException('Invalid task due date format');
    }
  }

  if (filters?.name) {
    matchStage['name'] = filters.name;
  }

  return [
    {
      $lookup: {
        from: 'tasks',
        localField: 'tasks',
        foreignField: '_id',
        as: 'tasks',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'participants',
        foreignField: '_id',
        as: 'participants',
      },
    },
    { $match: matchStage },
  ];
};
