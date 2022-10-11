import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString } from 'class-validator';

export class ProjectInput {
  @ApiProperty({
    description: '프로젝트 생성자 id',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsInt()
  owner_id: number;

  @ApiProperty({
    description: '프로젝트 시작 날짜',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  start_date: string;

  @ApiProperty({
    description: '프로젝트 종료 날짜',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  end_date: string;

  @ApiProperty({ description: '프로젝트 이름', type: String, required: true })
  @IsDefined()
  @IsString()
  project_title: string;

  @ApiProperty({
    description: '프로젝트 멤버 ids',
    type: [Number],
    required: true,
  })
  @IsInt({ each: true })
  memberIds: number[];
}
