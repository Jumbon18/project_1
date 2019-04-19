import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionManager } from './session.manager';
import { SessionController } from '../../presentation/api/controllers/session.controller';
import { Session } from '../../data/database/entities/entity.session';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionManager],
  controllers: [SessionController],
  exports: [SessionModule, SessionManager],
})
export class SessionModule {}
