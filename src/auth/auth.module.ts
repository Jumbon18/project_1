import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalRegisterStrategy } from './strategies/local-register.stratery';
import { LocalLoginStrategy } from './strategies/local-login.strategy';
import { CryptographerService } from './cryptographer.service';
import { SessionModule } from '../session/session.module';

@Module({
  imports:[UserModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService, LocalRegisterStrategy, LocalLoginStrategy, CryptographerService],
})
export class AuthModule {
}
