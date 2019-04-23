import Session from "entities/Session";
import {SocialAuthType} from "entities/SocialAuthType";

export abstract class IAuthManager {
    abstract registerLocal(email: string, password: string): Promise<Session>;
    abstract registerSocial(type: SocialAuthType, token: string): Promise<Session>;
    abstract loginLocal(email: string, password: string): Promise<Session>;
    abstract loginSocial(type: SocialAuthType, token: string): Promise<Session>;
}
