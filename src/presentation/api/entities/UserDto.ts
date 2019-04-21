import {IsString} from 'class-validator';

export class UserDto {
    @IsString()
    readonly id: string;

    @IsString()
    readonly email: string;

    constructor(
        id: string,
        email: string,
        ) {
        this.id = id;
        this.email = email;
    }
}
