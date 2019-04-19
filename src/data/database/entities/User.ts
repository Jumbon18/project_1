import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import uuid from 'uuid/v4';

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
}
