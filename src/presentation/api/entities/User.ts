import {IsNotEmpty, IsString, IsUUID} from "class-validator";

export default class User {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }
}
