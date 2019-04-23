import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export default class LocalLogin {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text')
    passwordHash: string;

    @Column('text')
    salt: string;

    constructor(id: string, email: string, passwordHash: string, salt: string) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.salt = salt;
    }
}
