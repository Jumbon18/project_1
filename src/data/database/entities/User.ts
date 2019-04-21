import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
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
    password_hash: string;

    @Column('text')
    salt: string;
}
