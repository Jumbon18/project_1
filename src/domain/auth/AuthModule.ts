import { Module } from '@nestjs/common';
import { UserModule } from 'domain/user/UserModule';
import { AuthController } from 'presentation/api/controllers/AuthController';
import { AuthManager } from 'domain/auth/AuthManager';
import { LocalRegisterStrategy } from 'domain/auth/strategies/LocalRegisterStrategy';
import { LocalLoginStrategy } from 'domain/auth/strategies/LocalLoginStrategy';
import { CryptographerService } from 'domain/auth/CryptographerService';
import { SessionModule } from 'domain/session/SessionModule';

@Module({
  imports:[UserModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthManager, LocalRegisterStrategy, LocalLoginStrategy, CryptographerService],
})
export class AuthModule {
}
