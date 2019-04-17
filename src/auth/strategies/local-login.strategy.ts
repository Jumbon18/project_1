import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(
  Strategy,
  'local-login',
) {
  constructor(private readonly service: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    });
  }

  public async validate(email, password, done: Function) {
    return await this.service.login(email, password)
      .then(user => done(null, user))
      .catch(err => done(err, false));
  }
}