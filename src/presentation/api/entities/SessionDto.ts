import {IsString} from 'class-validator';
import {UserDto} from 'presentation/api/entities/UserDto';

export class SessionDto {
    @IsString()
    readonly token: string;

    @IsString()
    readonly user: UserDto;

    constructor(
        token: string,
        user: UserDto,
    ) {
        this.token = token;
        this.user = user;
    }
}
