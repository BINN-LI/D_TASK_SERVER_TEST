import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.et';
import { ProjectService } from './project.sv';
import { ProjectController } from './project.ctrl';
import { User } from '../user/user.et';
@Module({
  imports: [TypeOrmModule.forFeature([Project, User])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
