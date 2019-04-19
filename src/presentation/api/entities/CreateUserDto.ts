import {IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
