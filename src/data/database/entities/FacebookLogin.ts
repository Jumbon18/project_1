import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "data/database/entities/User";


@Entity()
export default class FacebookLogin {
    @PrimaryGeneratedColumn("uuid")
    sid: string;

    @Column("uuid")
    @OneToOne(() => User, user => user.id)
    user: User;

    @Column('text')
    facebookUserId: string;

    constructor(sid: string, user: User, facebookUserId: string) {
        this.sid = sid;
        this.user = user;
        this.facebookUserId = facebookUserId;
    }
}
