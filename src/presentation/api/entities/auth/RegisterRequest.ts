import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export default class RegisterRequest {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    constructor(
        email: string,
        password: string
    ) {
        this.email = email;
        this.password = password;
    }
}
