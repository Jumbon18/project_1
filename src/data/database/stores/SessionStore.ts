import {Injectable} from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import ISessionStore from "data/database/stores/ISessionStore";
import Session from "data/database/entities/Session";
import User from "data/database/entities/User";

@Injectable()
export class SessionStore extends ISessionStore {
    constructor(
        @InjectRepository(Session) private readonly repository: Repository<Session>,
    ) {
        super();
    }

    async createSession(token: string, user: User) {
        const session = await this.repository.create({token, user});
        await this.repository.insert(session);
        return session;
    }
}
