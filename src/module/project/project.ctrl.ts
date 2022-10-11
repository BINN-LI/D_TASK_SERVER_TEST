import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './project.et';
import { ProjectInput } from './project.dto';
import { ProjectService } from './project.sv';

@Controller('project')
@ApiTags('project')
@ApiExtraModels(Project)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':userId')
  @ApiOperation({
    summary: '유저의 프로젝트 목록',
    description: '유저가 속해 있는 프로젝트 목록 리스트',
  })
  @ApiQuery({ name: 'userId', type: Number })
  async findAllByUserId(@Param('userId') userId: number) {
    return await this.projectService.findAllByUserId(userId);
  }

  @Post('')
  @ApiOperation({
    summary: '프로젝트 생성',
    description: '프로젝트 생성',
  })
  async create(@Body() projectInput: ProjectInput) {
    return await this.projectService.create(projectInput);
  }
}
