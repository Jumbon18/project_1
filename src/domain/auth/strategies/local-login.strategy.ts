import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthManager } from '../auth.manager';
import { CreateUserDto } from '../../../entities/create-user.dto';

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