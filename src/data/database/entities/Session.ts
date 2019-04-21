import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import uuid from 'uuid/v4';
import {User} from 'data/database/entities/User';

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    sid: uuid;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @Column('text')
    token: string;
}
