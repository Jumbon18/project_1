import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Session} from 'data/database/entities/Session';
import {CreateSessionDto} from 'presentation/api/entities/CreateSessionDto';
import {SessionRepository} from "data/repositories/SessionRepository";

@Injectable()
export class SessionManager {
    constructor(@InjectRepository(Session) private readonly repository: SessionRepository) {
    }

    async create(createSessionDto: CreateSessionDto): Promise<Session> {
        let {user, token} = createSessionDto;
        return await this.repository.insert({token, user});
    }

    async findOne(id: number): Promise<Session | undefined> {
        return await this.repository.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}