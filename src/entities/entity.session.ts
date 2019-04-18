import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, IsNull } from 'typeorm';
import * as uuid from 'uuid/v4';
import { User } from './entity.user';

@Entity()
export class Session {

  @PrimaryGeneratedColumn()
  sid: uuid;

  @ManyToOne(() => User, user => user.id)
  @Column('uuid')
  user: User;

  @Column('text')
  token: string;
}
