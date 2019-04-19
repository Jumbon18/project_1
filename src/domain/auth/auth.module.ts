import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from '../../presentation/api/controllers/auth.controller';
import { AuthManager } from './auth.manager';
import { LocalRegisterStrategy } from './strategies/local-register.stratery';
import { LocalLoginStrategy } from './strategies/local-login.strategy';
import { CryptographerService } from './cryptographer.service';
import { SessionModule } from '../session/session.module';

@Module({
  imports:[UserModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthManager, LocalRegisterStrategy, LocalLoginStrategy, CryptographerService],
})
export class AuthModule {
}
