import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalRegisterStrategy extends PassportStrategy(
  Strategy,
  'local-register',
) {
  constructor(private readonly service: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  public async validate(email: string, password: string) {
    const user = await this.service.signUp({
      email: email,
      password: password,
    });
    if (user) {
      return user;
    }
    return false;
  }
}
