import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthManager } from 'domain/auth/AuthManager';
import { CreateUserDto } from 'entities/CreateUserDto';

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(
  Strategy,
  'local-login',
) {
  constructor(private readonly service: AuthManager) {
    super({
      usernameField: 'userDto',
      passReqToCallback: false,
    });
  }

  public async validate(userDto: CreateUserDto, done: Function) {
    return await this.service.login(userDto)
      .then(user => done(null, user))
      .catch(err => done(err, false));
  }
}