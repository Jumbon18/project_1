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

  public async register(user: CreateUserDto) {
    const { hash, salt } = await this.cryptoService.hashPassword(user.password);
    user.password = hash;
    user.salt = salt;
    return this.userService.create(user)
      .then(user => {
         return this.createToken(user);
      });
  }

  public async login(email: string, password: string) {
    return await this.userService.findOneByEmail(email)
      .then(async user => {
        return await this.cryptoService.checkPassword(user.password_hash, user.salt, password)
          ? await this.getToken(user)
          : Promise.reject(new UnauthorizedException('Invalid password'));
      })
      .catch(err => Promise.reject(err));
  }

  private async getToken(user: User) {
    const token = await this.createToken(user);
    return await this.sessionService.create(new CreateSessionDto(user, token))
      .then(signedUser => Promise.resolve(signedUser))
      .catch(err => Promise.reject(err));
  }

  public async createToken(user: User): Promise<string> {
    const token = this.cryptoService.createToken();
    const user_id = this.userService.findOneByEmail(user.email).then(await user.id);
    const session = await this.sessionService.create(new CreateSessionDto(user_id, token));
    return session.token;
  }
}
