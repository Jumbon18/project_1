import {IsNotEmpty, IsString} from "class-validator";
import User from "./User";
import {ApiModelProperty} from "@nestjs/swagger";

export default class Session {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiModelProperty()
    @IsNotEmpty()
    user: User;

    constructor(token: string, user: User) {
        this.token = token;
        this.user = user;
    }
}
