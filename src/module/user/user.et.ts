import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { passwordHash } from '../utils/hash';
import { BeforeInsert, Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Card } from '../card/card.et';
import { BaseEntity } from '../common/base-entity';
import { Project } from '../project/project.et';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ description: '유저 이메일', nullable: false, type: String })
  @Column({
    type: 'varchar',
  })
  email: string;

  @ApiProperty({ description: '암호화된 유저 비밀번호', type: String })
  @Column({
    type: 'varchar',
    select: false,
  })
  password: string;

  @ApiProperty({ description: '유저 이름', nullable: false, type: String })
  @Column({
    type: 'varchar',
  })
  name: string;

  // team;

  // prf_img;

  @ApiPropertyOptional({ description: '유저 프로젝트 목록', type: [Project] })
  @ManyToMany(() => Project, (project) => project.members)
  projects: Project[];

  @ApiPropertyOptional({ description: '유저가 만든 카드 목록', type: [Card] })
  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await passwordHash(this.password);
    }
  }
}
