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
    password_hash: string;

    @Column('text')
    salt: string;

    constructor(id: string,
                email: string,
                password_hash: string,
                salt: string,
    ) {
        this.id = id;
        this.email = email;
        this.password_hash = password_hash;
        this.salt = salt;
    }
}
