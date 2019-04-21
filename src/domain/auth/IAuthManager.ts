import {CreateUserDto} from "presentation/api/entities/CreateUserDto";
import Session from "entities/Session";

export abstract class IAuthManager {
    abstract register(userDto: CreateUserDto): Promise<Session>;
    abstract login(email: string, password: string): Promise<Session>;
}
