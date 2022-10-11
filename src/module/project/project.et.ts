import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Card } from '../card/card.et';
import { BaseEntity } from '../common/base-entity';
import { User } from '../user/user.et';
import { DateTime } from 'luxon';

@Entity()
export class Project extends BaseEntity {
  @ApiProperty({
    description: '프로젝트 생성자 id',
    nullable: false,
    type: Number,
  })
  @Column({ type: 'int', default: null })
  owner_id: number;

  @ApiProperty({
    description: '프로젝트 시작 날짜',
    nullable: false,
    type: Date,
  })
  @Column({ type: 'datetime' })
  start_date: Date;

  @ApiProperty({
    description: '프로젝트 종료 날짜',
    nullable: false,
    type: Date,
  })
  @Column({ type: 'datetime' })
  end_date: Date;

  @ApiProperty({
    description: '프로젝트 이름',
    nullable: false,
    type: String,
  })
  @Column({ type: 'varchar' })
  project_title: string;

  @ApiProperty({
    description: '프로젝트 카드 리스트',
    type: [Card],
  })
  @OneToMany(() => Card, (card) => card.project)
  cards: Card[];

  @ApiProperty({
    description: '프로젝트 멤버 리스트',
    type: [User],
  })
  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  members: User[];

  @BeforeInsert()
  async convertInputData() {
    if (typeof this.start_date === 'string') {
      this.start_date = await DateTime.fromFormat(
        this.start_date,
        'YYYY-MM-DD',
      );
    }
    if (typeof this.end_date === 'string') {
      this.end_date = await DateTime.fromFormat(this.end_date, 'YYYY-MM-DD');
    }
  }
}
