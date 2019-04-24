import Session from "data/database/entities/Session";
import User from "data/database/entities/User";

export default abstract class ISessionStore {
    abstract createSession(token: string, user: User): Promise<Session>;
    abstract findSession(token: string): Promise<Session | undefined>;
}
