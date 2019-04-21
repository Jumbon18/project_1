import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from 'data/database/entities/User';
import {CryptoUtils} from 'domain/auth/CryptoUtils';
import {CreateUserDto} from 'presentation/api/entities/CreateUserDto';
import {CreateSessionDto} from 'presentation/api/entities/CreateSessionDto';
import {SessionDto} from 'presentation/api/entities/SessionDto';
import {UserStore} from "data/stores/UserStore";
import {SessionStore} from "data/stores/SessionStore";

@Injectable()
export class AuthManager {
    constructor(
        private readonly userRepository: UserStore,
        private readonly sessionRepository: SessionStore,
    ) {}

    public async register(userDto: CreateUserDto) {
        const {hash, salt} = await CryptoUtils.hashPassword(userDto.password);
        userDto.password = hash;

        const user = await this.userRepository.create(userDto, salt);
        return await this.createToken(user);
    }

    public async login(userDto: CreateUserDto) {
        const user = await this.userRepository.findOneByEmail(userDto.email);
        if (await CryptoUtils.checkPassword(user.password_hash, user.salt, userDto.password)) {
            return await this.getToken(user);
        } else {
            throw new UnauthorizedException('Invalid password');
        }
    }

    private async getToken(user: User) {
        return await this.createToken(user);
    }

    public async createToken(user: User): Promise<SessionDto> {
        const token = CryptoUtils.createToken();
        const session = await this.sessionRepository.insert(new CreateSessionDto(user, token));
        return {token: session.token, user: {id: user.id, email: user.email}};
    }
}
