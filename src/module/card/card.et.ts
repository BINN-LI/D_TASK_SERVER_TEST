import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { Project } from '../project/project.et';
import { User } from '../user/user.et';
import { CardTypeEnum } from './card.type';

@Entity()
export class Card extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
    default: null,
  })
  sub_title: string;

  @Column({
    type: 'varchar',
  })
  content: string;

  @Column({
    type: 'enum',
    enum: CardTypeEnum,
    default: CardTypeEnum.TODO,
  })
  card_type: CardTypeEnum;

  @Column({ type: 'datetime', default: null })
  end_date: Date;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', comment: '카드 생성자 id' })
  user_id: number;

  @ManyToOne(() => Project, (project) => project.cards)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: 'int', default: null })
  project_id: number;
}
