import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthManager } from 'domain/auth/AuthManager';
import { CreateUserDto } from 'entities/CreateUserDto';

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
