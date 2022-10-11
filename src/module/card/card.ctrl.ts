import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardInput } from './card.dto';
import { Card } from './card.et';
import { CardService } from './card.sv';

@Controller('card')
@ApiTags('card')
@ApiExtraModels(Card)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('project/:projectId/card')
  @ApiOperation({
    summary: '프로젝트에 속해 있는 모든 카드 리스트',
    description: '프로젝트 id를 통해 모든 카드 엔티티 리턴',
  })
  async findAll(@Param('projectId') projectId: number) {
    return await this.cardService.findAll(projectId);
  }

  @Get('card/:cardId')
  @ApiOperation({
    summary: '카드 상세',
    description: '특정 카드 상세 내용 리턴',
  })
  async findOne(@Param('cardId') cardId: number) {
    return await this.cardService.findOne(cardId);
  }

  @Post('project/:projectId/card/create')
  @ApiOperation({
    summary: '프로젝트 카드 생성',
    description: '특정 프로젝트의 카드 생성',
  })
  async create(
    @Param('projectId') projectId: number,
    @Body() cardInput: CardInput,
  ) {
    return await this.cardService.create(projectId, cardInput);
  }

  @Get('project/:projectId/card/search')
  @ApiOperation({
    summary: '프로젝트 내 카드 검색',
    description: '하나의 프로젝트 내의 카드 검색',
  })
  async search(
    @Param('projectId') projectId: number,
    @Query('keyword') keyword: string,
  ) {
    return await this.cardService.search(projectId, keyword);
  }

  @Delete('project/:projectId/card/:cardId')
  @ApiOperation({
    summary: '프로젝트 내 카드 삭제',
    description: '특정 프로젝트 내의 특정 카드 삭제',
  })
  async delete(
    @Param('projectId') projectId: number,
    @Param('cardId') cardId: number,
  ) {
    return await this.cardService.delete(projectId, cardId);
  }
}
