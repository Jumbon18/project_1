import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiModelProperty} from "@nestjs/swagger";

export default class ForgotPasswordRequest {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    constructor(
        email: string,
    ) {
        this.email = email;
    }
}
