import {IsNotEmpty, IsString} from "class-validator";

export default class SocialLoginRequest {
    @IsNotEmpty()
    readonly type: string;

    @IsNotEmpty()
    @IsString()
    token: string;

    constructor(type: string, token: string) {
        this.type = type;
        this.token = token;
    }
}