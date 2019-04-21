import {IsNotEmpty, IsString} from 'class-validator';
import User from 'data/database/entities/User';

export class CreateSessionDto {
    @IsString()
    @IsNotEmpty()
    user: User;

    @IsString()
    @IsNotEmpty()
    token: string;


    constructor(
        user: User,
        token: string,
    ) {
        this.user = user;
        this.token = token;
    }
}
