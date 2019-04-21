import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class User {
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

    constructor(id: string,
                email: string,
                password_hash: string,
                salt: string,
    ) {
        this.id = id;
        this.email = email;
        this.passwordHash = password_hash;
        this.salt = salt;
    }
}
