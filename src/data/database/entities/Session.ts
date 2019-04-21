import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import User from 'data/database/entities/User';

@Entity()
export default class Session {
    @PrimaryGeneratedColumn("uuid")
    sid: string;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @Column('text')
    token: string;

    constructor(sid: string,
                user: User,
                token: string,
    ) {
        this.sid = sid;
        this.user = user;
        this.token = token;
    }
}
