import { Module } from '@nestjs/common';
import { UsersModule } from '../user/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalRegisterStrategy } from './strategies/local-register.stratery';
import { LocalLoginStrategy } from './strategies/local-login.strategy';
import { UsersService } from '../user/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [UsersService, AuthService, JwtStrategy, LocalRegisterStrategy, LocalLoginStrategy],
  exports: [AuthService],
})
export class AuthModule {}
