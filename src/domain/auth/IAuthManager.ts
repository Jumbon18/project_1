import Session from "entities/Session";

export abstract class IAuthManager {
    abstract registerLocal(email: string, password: string): Promise<Session>;
    abstract registerSocial(type: string, token: string): Promise<Session>;
    abstract loginLocal(email: string, password: string): Promise<Session>;
    abstract loginSocial(type: string, token: string): Promise<Session>;
}
