import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.et';
import { CardController } from './card.ctrl';
import { Card } from './card.et';
import { CardService } from './card.sv';

@Module({
  imports: [TypeOrmModule.forFeature([Card, User])],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
