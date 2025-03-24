import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'bson';
import { mongodbErrorHandler } from '../../core/errors/mongodb-error-handler';
import { generateProjectsFilteredProjection, generateTaskCountsProjection } from './projects-agregations.helper';
import { GroupedProjectData, ProjectData, ProjectDto, ProjectFilter } from './projects.model';
import { ProjectModel } from './projects.schema';

@Injectable()
export class ProjectsRepository {
  async getFilteredProjects(filters: ProjectFilter): Promise<ProjectData[]> {
    return ProjectModel.aggregate([
      ...generateProjectsFilteredProjection(filters),
      {
        $project: {
          name: 1,
          description: 1,
          'tasks._id': 1,
          'tasks.title': 1,
          'tasks.status': 1,
          'participants._id': 1,
          'participants.name': 1,
        },
      },
    ]);
  }

  async getGroupedProjects(filter: ProjectFilter): Promise<GroupedProjectData[]> {
    return ProjectModel.aggregate([...generateProjectsFilteredProjection(filter), ...generateTaskCountsProjection()]);
  }

  async getById(id: string): Promise<ProjectData> {
    const docs = await ProjectModel.aggregate([
      { $match: { _id: new ObjectId(id) } },
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
      {
        $project: {
          '__v': 0,
          'participants.createdAt': 0,
          'participants.updatedAt': 0,
          'participants.__v': 0,
          'tasks.__v': 0,
        },
      },
    ]);
    if (!docs.length) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return docs[0] as ProjectData;
  }

  async create(project: ProjectDto): Promise<ProjectData> {
    try {
      return await ProjectModel.create(project);
    } catch (error) {
      mongodbErrorHandler(error);
    }
  }

  async update(id: string, project: ProjectDto): Promise<ProjectData> {
    try {
      const doc = await ProjectModel.findOneAndUpdate({ _id: id }, project, { runValidators: true, new: true }).lean();
      if (!doc) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      return doc;
    } catch (error) {
      mongodbErrorHandler(error);
    }
  }

  async delete(id: string): Promise<ProjectData> {
    const doc = await ProjectModel.findByIdAndDelete(id).lean();
    if (!doc) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return doc;
  }
}
