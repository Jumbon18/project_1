import {IsInstance, IsNotEmpty, IsString} from "class-validator";
import User from "./User";

export default class Session {
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    user: User;

    constructor(token: string, user: User) {
        this.token = token;
        this.user = user;
    }
}
