import {Injectable} from "@nestjs/common";
import {Session} from "data/database/entities/Session";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {CreateSessionDto} from "presentation/api/entities/CreateSessionDto";

@Injectable()
export class SessionStore {
    constructor(
        @InjectRepository(Session) private readonly repository: Repository<Session>,
    ) {}

    async insert(createSessionDto: CreateSessionDto): Promise<Session> {
        let {user, token} = createSessionDto;
        const session = await this.repository.create({token, user});
        await this.repository.insert(session);
        return session;
    }
}
