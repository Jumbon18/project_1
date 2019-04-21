import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CryptoUtils} from 'domain/auth/CryptoUtils';
import {CreateUserDto} from 'presentation/api/entities/CreateUserDto';
import {CreateSessionDto} from 'presentation/api/entities/CreateSessionDto';
import {UserStore} from "data/database/stores/UserStore";
import {SessionStore} from "data/database/stores/SessionStore";
import {IAuthManager} from "domain/auth/IAuthManager";
import User from "data/database/entities/User";
import {mapDbSession} from "domain/mappers/DbMappers";

@Injectable()
export class AuthManager extends IAuthManager {
    constructor(
        private readonly userStore: UserStore,
        private readonly sessionStore: SessionStore,
    ) {
        super();
    }

    public async register(userDto: CreateUserDto) {
        const {hash, salt} = await CryptoUtils.hashPassword(userDto.password);
        userDto.password = hash;

        const user = await this.userStore.create(userDto, salt);
        return await this.createSession(user);
    }

    public async login(email: string, password: string) {
        const user = await this.userStore.findOneByEmail(email);
        if (!user)
            throw new UnauthorizedException('User not found');
        if (!await CryptoUtils.checkPassword(user.password_hash, user.salt, password))
            throw new UnauthorizedException('Invalid password');

        return await this.createSession(user);
    }

    private async createSession(user: User) {
        const token = CryptoUtils.createToken();
        const session = await this.sessionStore.createSession(new CreateSessionDto(user, token));
        return mapDbSession(session);
    }
}
