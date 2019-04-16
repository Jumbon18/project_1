import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../user/users.service';
import { CryptographerService } from './cryptographer.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly service: UsersService,
    private readonly cryptoService: CryptographerService) {
  }

  public async signUp(user: CreateUserDto) {
    user['password'] = await this.cryptoService.hashPassword(user.password);
    return this.service.create(user)
      .then(user => {
        return this.createToken(user);
      });
  }

  public async signIn(email: string, password: string) {
    return await this.service.findOneByEmail(email)
      .then(async user => {
        return await this.cryptoService.checkPassword(user.password, password)
          ? Promise.resolve(user)
          : Promise.reject(new UnauthorizedException('Invalid password'));
      })
      .catch(err => Promise.reject(err));
  }

  public async verify(payload: number) {
    return await this.service.findOne(payload)
      .then(signedUser => Promise.resolve(signedUser))
      .catch(err => Promise.reject(new UnauthorizedException('Invalid Authorization')));
  }

  public async createToken(signedUser) {
    const expiresIn = process.env.JWT_EXPIRATION, secretOrKey = process.env.SECRET_KEY;
    const user = {
      sub: signedUser._id,
      email: signedUser.email,
      role: signedUser.role,
      status: signedUser.status,
    };
    return {
      expires_in: expiresIn,
      access_token: await sign(user, secretOrKey, { expiresIn }),
    };
  }
}
