import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(
  Strategy,
  'local-login',
) {
  constructor(private readonly service: AuthService) {
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