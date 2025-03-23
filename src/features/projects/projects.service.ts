import { Injectable } from '@nestjs/common';
import { GroupedProjectData, ProjectData, ProjectDto, ProjectFilter } from './projects.model';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async getFilteredProjects(filters: ProjectFilter): Promise<ProjectData[]> {
    return this.projectsRepository.getFilteredProjects(filters);
  }

  async getGroupedProjects(filters: ProjectFilter): Promise<GroupedProjectData[]> {
    return this.projectsRepository.getGroupedProjects(filters);
  }

  async getById(id: string): Promise<ProjectData> {
    return this.projectsRepository.getById(id);
  }

  async create(task: ProjectDto): Promise<ProjectData> {
    return this.projectsRepository.create(task);
  }

  async update(id: string, task: ProjectDto): Promise<ProjectData> {
    return this.projectsRepository.update(id, task);
  }

  async delete(id: string): Promise<ProjectData> {
    return this.projectsRepository.delete(id);
  }
}
