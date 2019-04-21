import {Injectable} from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {CreateSessionDto} from "presentation/api/entities/CreateSessionDto";
import {ISessionStore} from "data/database/stores/ISessionStore";
import Session from "data/database/entities/Session";

@Injectable()
export class SessionStore extends ISessionStore {
    constructor(
        @InjectRepository(Session) private readonly repository: Repository<Session>,
    ) {
        super();
    }

    async createSession(createSessionDto: CreateSessionDto) {
        let {user, token} = createSessionDto;
        const session = await this.repository.create({token, user});
        await this.repository.insert(session);
        return session;
    }
}
