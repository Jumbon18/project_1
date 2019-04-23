import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {ApiModelProperty} from "@nestjs/swagger";

export default class LoginRequest {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty()
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
