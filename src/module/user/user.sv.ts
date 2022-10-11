import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base-service';
import { User } from './user.et';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super();
  }

  async findAll() {
    try {
      const result = await this.userRepo.find();
      return this.resList(result);
    } catch (err) {
      const errMsg = err.message;
      console.log('user service findAll error : ', errMsg);
      return this.resError(errMsg);
    }
  }
}
