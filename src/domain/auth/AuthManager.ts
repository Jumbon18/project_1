import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'data/database/entities/User';
import { UserManager } from 'domain/user/UserManager';
import { CryptographerService } from 'domain/auth/CryptographerService';
import { CreateUserDto } from 'entities/CreateUserDto';
import { CreateSessionDto } from 'entities/CreateSessionDto';
import { SessionManager } from 'domain/session/SessionManager';
import { SessionDto } from 'presentation/api/entities/session.dto';

@Injectable()
export class AuthManager {
  constructor(
    private readonly userService: UserManager,
    private readonly sessionService: SessionManager,
    private readonly cryptoService: CryptographerService) {
  }

  public async register(userDto: CreateUserDto) {
    const { hash, salt } = await this.cryptoService.hashPassword(userDto.password);
    userDto.password = hash;

    const user = await this.userService.create(userDto, salt);
    return await this.createToken(user);
  }

  public async login(userDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(userDto.email);
    if (await this.cryptoService.checkPassword(user.password_hash, user.salt, userDto.password)) {
      return await this.getToken(user);
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }

  private async getToken(user: User) {
    return await this.createToken(user);
  }

  public async createToken(user: User): Promise<SessionDto> {
    const token = this.cryptoService.createToken();
    const session = await this.sessionService.create(new CreateSessionDto(user, token));
    return { token: session.token, user: { id: user.id, email: user.email } };
  }
}
