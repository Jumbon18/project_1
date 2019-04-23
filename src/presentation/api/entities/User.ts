import {IsNotEmpty, IsString, IsUUID} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger";

export default class User {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }
}
