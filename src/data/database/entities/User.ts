import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    constructor(id: string,
                email: string,
    ) {
        this.id = id;
        this.email = email;
    }
}
