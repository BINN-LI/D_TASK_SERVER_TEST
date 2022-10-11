import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BaseService } from '../common/base-service';
import { IResType } from '../common/response-type';
import { User } from '../user/user.et';
import { ProjectInput } from './project.dto';
import { Project } from './project.et';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super();
  }
  async findAllByUserId(userId: number): Promise<IResType> {
    try {
      const result = await this.userRepo.findOne({
        where: { id: userId },
        relations: ['projects', 'projects.cards'],
      });
      const projects = result.projects;
      return this.resList(projects);
    } catch (err) {
      console.log('project.service findAll error : ', err.message);
      return this.resError(err.message);
    }
  }

  async create(projectInput: ProjectInput): Promise<IResType> {
    try {
      const members = await this.userRepo.find({
        where: { id: In(projectInput.memberIds) },
      });
      delete projectInput.memberIds;
      const inputData = { ...projectInput, members };
      const result = await this.projectRepository.save(inputData);
      return this.resObj(result);
    } catch (err) {
      console.log('project.service create error : ', err.message);
      return this.resError(err.message);
    }
  }
}
