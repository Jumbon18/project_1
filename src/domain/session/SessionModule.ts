import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionManager } from 'domain/session/SessionManager';
import { SessionController } from 'presentation/api/controllers/SessionController';
import { Session } from 'data/database/entities/Session';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionManager],
  controllers: [SessionController],
  exports: [SessionModule, SessionManager],
})
export class SessionModule {}
