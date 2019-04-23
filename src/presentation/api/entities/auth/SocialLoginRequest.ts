import {IsNotEmpty, IsString} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger";
import {SocialAuthType} from "entities/SocialAuthType";

export default class SocialLoginRequest {
    @ApiModelProperty({enum: SocialAuthType})
    @IsNotEmpty()
    @IsString()
    readonly type: SocialAuthType;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    token: string;

    constructor(type: SocialAuthType, token: string) {
        this.type = type;
        this.token = token;
    }
}
