import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "data/database/entities/User";

@Entity()
export default class LocalLogin {
    @PrimaryGeneratedColumn("uuid")
    sid: string;

    @OneToOne(() => User, user => user.id)
    user: User;

    @Column('text')
    passwordHash: string;

    @Column('text')
    salt: string;


    constructor(sid: string, user: User, passwordHash: string, salt: string) {
        this.sid = sid;
        this.user = user;
        this.passwordHash = passwordHash;
        this.salt = salt;
    }
}
