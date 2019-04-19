import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Injectable()
export class LocalRegisterStrategy extends PassportStrategy(
  Strategy,
  'local-register',
) {
  constructor(private readonly service: AuthService) {
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
