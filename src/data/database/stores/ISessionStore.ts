import {CreateSessionDto} from "presentation/api/entities/CreateSessionDto";
import Session from "data/database/entities/Session";

export abstract class ISessionStore {
    abstract createSession(createSessionDto: CreateSessionDto): Promise<Session>;
}
