import {Injectable} from "@nestjs/common";
import {Session} from "data/database/entities/Session";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {CreateSessionDto} from "presentation/api/entities/CreateSessionDto";
import {SessionRepositoryModule} from "data/repositories/SessionRepositoryModule";

@Injectable()
export class SessionRepository {
    constructor(@InjectRepository(SessionRepositoryModule) private readonly repository: Repository<Session>) {
    }

    async insert(createSessionDto: CreateSessionDto): Promise<Session> {
        let {user, token} = createSessionDto;
        const session = await this.repository.create({token, user});
        await this.repository.insert(session);
        return session;
    }

    async findOne(id: number): Promise<Session | undefined> {
        return await this.repository.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

}