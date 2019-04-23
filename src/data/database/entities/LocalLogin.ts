import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "data/database/entities/User";
import {PrimaryColumn} from "typeorm/decorator/columns/PrimaryColumn";


@Entity()
export default class LocalLogin {
    @PrimaryColumn()
    @OneToOne(() => User, user => user.id)
    user: User;

    @Column('text')
    passwordHash: string;

    @Column('text')
    salt: string;

    constructor(user: User, passwordHash: string, salt: string) {
        this.user = user;
        this.passwordHash = passwordHash;
        this.salt = salt;
    }
}
