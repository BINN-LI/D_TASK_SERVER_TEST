import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ description: '해당 엔티티 id', type: Number })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ description: '엔티티 생성 날짜', type: Date })
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty({ description: '엔티티 업데이트 날짜', type: Date })
  @UpdateDateColumn()
  updatedAt?: Date;

  static of<T>(type: { new (): T }, params: Partial<T>): T {
    const obj = new type();

    Object.assign(obj, params);

    return obj;
  }
}
