import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaseService } from '../common/base-service';
import { IResType } from '../common/response-type';
import { CardInput } from './card.dto';
import { Card } from './card.et';

@Injectable()
export class CardService extends BaseService<Card> {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
  ) {
    super();
  }

  async findAll(project_id: number): Promise<IResType> {
    try {
      const result = await this.cardRepo.find({
        where: {
          project_id,
        },
        relations: ['user'],
      });
      return this.resList(result);
    } catch (err) {
      console.log('card.service findAll error : ', err.message);
      return this.resError(err.message);
    }
  }

  async findOne(cardId: number) {
    try {
      const result = await this.cardRepo.findOne({ where: { id: cardId } });
      return this.resObj(result);
    } catch (err) {
      const errMsg = err.message;
      console.log('card service findOne error : ', errMsg);
      return this.resError(errMsg);
    }
  }

  async create(projectId: number, cardInput: CardInput): Promise<IResType> {
    try {
      const result = await this.cardRepo.save({ projectId, ...cardInput });
      return this.resObj(result);
    } catch (err) {
      console.log('card.service create error : ', err.message);
      return this.resError(err.message);
    }
  }

  async search(project_id: number, keyword: string) {
    try {
      const result = await this.cardRepo.find({
        where: [
          {
            title: Like(`%${keyword}%`),
            project_id,
          },
          {
            content: Like(`%${keyword}%`),
            project_id,
          },
        ],
      });
      return this.resList(result);
    } catch (err) {
      console.log('card.service search error :', err.message);
      return this.resError(err.message);
    }
  }

  async delete(project_id: number, id: number) {
    try {
      await this.cardRepo.delete(id);
      const result = await this.cardRepo.find({
        where: {
          project_id,
        },
      });
      return this.resList(result);
    } catch (err) {
      console.log('card.service search error :', err.message);
      return this.resError(err.message);
    }
  }
}
