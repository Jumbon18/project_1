import Session from "entities/Session";

export abstract class IAuthManager {
    abstract register(email: string, password: string): Promise<Session>;
    abstract registerSocial(type: string, token: string): Promise<Session>;
    abstract login(email: string, password: string): Promise<Session>;
    abstract loginSocial(type: string, token: string): Promise<Session>;
}
