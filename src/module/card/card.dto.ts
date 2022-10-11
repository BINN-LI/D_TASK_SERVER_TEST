import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { CardTypeEnum } from './card.type';

export class CardInput {
  @ApiProperty({ description: '카드 생성자 id', type: Number, required: true })
  @IsDefined()
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'default: TODO',
    enum: CardTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(CardTypeEnum)
  card_type: CardTypeEnum;

  @ApiProperty({ description: '카드 제목', type: String, required: true })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({ description: '카드 부제목', type: String, required: false })
  @IsOptional()
  @IsString()
  sub_title: string;

  @ApiProperty({ description: '카드 내용', type: String, required: true })
  @IsDefined()
  @IsString()
  content: string;

  @ApiProperty({ description: '마감 날짜', type: String, required: false })
  @IsOptional()
  @IsString()
  end_date: string;
}
