import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, Post, Put, Query } from '@nestjs/common';
import { GroupedProjectData, ProjectData, ProjectDto, ProjectFilter } from './projects.model';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() project: ProjectDto): Promise<ProjectData> {
    return this.projectsService.create(project);
  }

  @Get()
  async getAll(
    @Query('groupStatus', new DefaultValuePipe(false), ParseBoolPipe) groupStatus: boolean,
    @Body('filters') filters: ProjectFilter,
  ): Promise<ProjectData[] | GroupedProjectData[]> {
    if (groupStatus) {
      return this.projectsService.getGroupedProjects(filters);
    }
    return this.projectsService.getFilteredProjects(filters);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProjectData> {
    return this.projectsService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() project: ProjectDto): Promise<ProjectData> {
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProjectData> {
    return this.projectsService.delete(id);
  }
}
