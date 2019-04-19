import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'data/database/entities/User';
import { CryptographerService } from 'domain/auth/CryptographerService';
import { CreateUserDto } from 'presentation/api/entities/CreateUserDto';
import { CreateSessionDto } from 'presentation/api/entities/CreateSessionDto';
import { SessionDto } from 'presentation/api/entities/SessionDto';
import {UserRepository} from "data/repositories/UserRepository";
import {SessionRepository} from "data/repositories/SessionRepository";

@Injectable()
export class AuthManager {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly cryptoService: CryptographerService) {
  }

  public async register(userDto: CreateUserDto) {
    const { hash, salt } = await this.cryptoService.hashPassword(userDto.password);
    userDto.password = hash;

    const user = await this.userRepository.create(userDto, salt);
    return await this.createToken(user);
  }

  public async login(userDto: CreateUserDto) {
    const user = await this.userRepository.findOneByEmail(userDto.email);
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
    const session = await this.sessionRepository.insert(new CreateSessionDto(user, token));
    return { token: session.token, user: { id: user.id, email: user.email } };
  }
}
