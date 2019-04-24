import Session from "entities/Session";
import User from "entities/User";
import {SocialAuthType} from "entities/SocialAuthType";

export abstract class IAuthManager {
    abstract registerLocal(email: string, password: string): Promise<Session>;
    abstract registerSocial(type: SocialAuthType, token: string): Promise<Session>;
    abstract loginLocal(email: string, password: string): Promise<Session>;
    abstract loginSocial(type: SocialAuthType, token: string): Promise<Session>;
    abstract getSession(token: string): Promise<Session | undefined>;
    abstract getUser(token: string): Promise<User | undefined>;
}
