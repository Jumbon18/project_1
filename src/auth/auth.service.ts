import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/entity.user';
import { UserService } from '../user/user.service';
import { CryptographerService } from './cryptographer.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateSessionDto } from '../session/dto/create-session.dto';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UserService,
      private readonly sessionService: SessionService,
      private readonly cryptoService: CryptographerService) {
  }

  public async register(userDto: CreateUserDto) {
    const {hash, salt} = await this.cryptoService.hashPassword(userDto.password);
    userDto.password = hash;

    const user = await this.userService.create(userDto, salt);
    return await this.createToken(user);
  }

  public async login(userDto: CreateUserDto) {
     await this.userService.findOneByEmail(userDto.email)
        .then(async user => {
          return await this.cryptoService.checkPassword(user.password_hash, user.salt, userDto.password)
              ? await this.getToken(user)
              : Promise.reject(new UnauthorizedException('Invalid password'));
        })
        .catch(err => Promise.reject(err));
  }

  private async getToken(user: User) {
    return await this.createToken(user);
  }

  public async createToken(user: User): Promise<string> {
    const token = this.cryptoService.createToken();
    const session = await this.sessionService.create(new CreateSessionDto(user, token));
    return session.token;
  }
}
