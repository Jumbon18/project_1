import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(
  Strategy,
  'local-signIn',
) {
  constructor(private readonly service: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    });
  }

  public async validate(email, password, done: Function) {
    return await this.service.signIn(email, password)
      .then(user => done(null, user))
      .catch(err => done(err, false));
  }
}

export const callback = (err, user, info) => {
  if (typeof info != 'undefined') {
    throw new UnauthorizedException(info.message)
  } else if (err || !user) {
    throw err || new UnauthorizedException();
  }
  return user;
}