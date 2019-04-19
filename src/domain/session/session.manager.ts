import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../data/database/entities/entity.session';
import { User } from '../../data/database/entities/entity.user';
import { CreateSessionDto } from '../../entities/create-session.dto';

@Injectable()
export class SessionManager {
  constructor(
    @InjectRepository(Session) private readonly repository: Repository<Session>,
  ) {
  }

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    let { user, token } = createSessionDto;
    const session = await this.repository.create({ token, user });
    await this.repository.insert(session);
    return session;
  }

  async findAll(): Promise<Session[]> {
    return await this.repository.find();
  }

  async findOneByUser(user: User): Promise<Session | undefined> {
    return await this.repository.findOne(user.id);
  }

  async findOne(id: number): Promise<Session | undefined> {
    return await this.repository.findOne(id);
  }

  async save(session: Session): Promise<Session> {
    return await this.repository.save(session);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}