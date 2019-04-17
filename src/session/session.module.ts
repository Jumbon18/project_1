import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { Session } from '../entities/entity.session';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionService],
  controllers: [SessionController],
  exports: [SessionModule, SessionService],
})
export class SessionModule {}
