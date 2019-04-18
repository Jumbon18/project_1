import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as uuid from 'uuid/v4';
import { NullableTypeAnnotation } from 'babel-types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: uuid;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  @Exclude()
  password_hash: string;

  @Column('text')
  @Exclude()
  salt: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
