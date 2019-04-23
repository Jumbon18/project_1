import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "data/database/entities/User";

@Entity()
export default class LocalLogin {
    @PrimaryGeneratedColumn("uuid")
    sid: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column('text')
    email: string;

    @Column('text')
    passwordHash: string;

    @Column('text')
    salt: string;

    constructor(
        sid: string,
        user: User,
        email: string,
        passwordHash: string,
        salt: string,
    ) {
        this.sid = sid;
        this.user = user;
        this.email = email;
        this.passwordHash = passwordHash;
        this.salt = salt;
    }
}
