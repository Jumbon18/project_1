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

  public async validate(email: string, password: string, salt:string) {
    const user = await this.service.register({
      email: email,
      password_hash: password,
      salt: salt
    });
    if (user) {
      return user;
    }
    return false;
  }
}
