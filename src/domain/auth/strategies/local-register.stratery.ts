import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthManager } from '../auth.manager';
import { CreateUserDto } from '../../../entities/create-user.dto';

@Injectable()
export class LocalRegisterStrategy extends PassportStrategy(
  Strategy,
  'local-register',
) {
  constructor(private readonly service: AuthManager) {
    super({
      usernameField: 'userDto',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  public async validate(userDto:CreateUserDto) {
    const user = await this.service.login(userDto);
    if (user != null) {
      return user;
    }
    return false;
  }
}
