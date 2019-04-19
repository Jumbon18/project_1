import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from 'presentation/api/controllers/SessionController';
import { Session } from 'data/database/entities/Session';
import {SessionRepository} from "data/repositories/SessionRepository";

@Module({
    imports: [TypeOrmModule.forFeature([Session])],
    providers: [SessionRepository],
    controllers: [SessionController],
    exports: [SessionRepositoryModule, SessionRepository],
})
export class SessionRepositoryModule {}