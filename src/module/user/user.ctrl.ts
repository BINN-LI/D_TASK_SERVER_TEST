import { Controller, Get, Post } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './user.et';
import { UserService } from './user.sv';

@Controller('user')
@ApiTags('user')
@ApiExtraModels(User)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '모든 유저 목록',
    description: '모든 유저 리턴',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  // create;
  // update;
  // passwordConfirm;
  // updatePassword;
  // updateUserProfile;
  // deleteUserProfile;
}
