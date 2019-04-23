import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export default class FacebookLogin {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column('text')
    token: string;

    constructor(user_id: string, token: string) {
        this.user_id = user_id;
        this.token = token;
    }
}
