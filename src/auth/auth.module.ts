import { Module } from '@nestjs/common';
import { EnvModule } from '../database/env/env.module';
import { UsersModule } from '../user/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalRegisterStrategy } from './strategies/local-register.stratery';
import { LocalLoginStrategy } from './strategies/local-login.strategy';

@Module({
  imports: [EnvModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalRegisterStrategy, LocalLoginStrategy],
  exports: [AuthService],
})
export class AuthModule {}
