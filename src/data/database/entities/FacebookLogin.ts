import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "data/database/entities/User";


@Entity()
export default class FacebookLogin {
    @PrimaryGeneratedColumn("uuid")
    sid: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column('text')
    facebookUserId: string;

    constructor(
        sid: string,
        user: User,
        facebookUserId: string,
    ) {
        this.sid = sid;
        this.user = user;
        this.facebookUserId = facebookUserId;
    }
}
