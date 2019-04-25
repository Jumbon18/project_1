import {Request} from "express";
import Session from "entities/Session";

export default abstract class IAuthService {
    abstract getSession(request: Request): Promise<Session | undefined>;
    abstract getSessionOrThrow(request: Request): Promise<Session>;
    abstract updateUserPassword(email: string): Promise<void>;
}
