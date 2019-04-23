import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CryptoUtils} from 'domain/auth/CryptoUtils';
import {IAuthManager} from "domain/auth/IAuthManager";
import User from "data/database/entities/User";
import {mapDbSession} from "domain/mappers/DbMappers";
import IUserStore from "data/database/stores/IUserStore";
import ISessionStore from "data/database/stores/ISessionStore";
import FacebookApi from "data/api/facebook/FacebookApi"
import ILoginStore from "data/database/stores/ILoginStore";
import LocalLogin from "data/database/entities/LocalLogin";

@Injectable()
export class AuthManager extends IAuthManager {
    constructor(
        private readonly userStore: IUserStore,
        private readonly loginStore: ILoginStore,
        private readonly sessionStore: ISessionStore,
        private readonly facebookApi: FacebookApi,
    ) {
        super();
    }

    public async register(email: string, password: string) {
        const {passwordHash, salt} = await CryptoUtils.hashPassword(password);
        const user = await this.userStore.create(email);
        await this.loginStore.createLocal(user, passwordHash, salt);

        return await this.createSession(user);
    }

    public async registerSocial(type: string, token: string) {
        switch (type) {
            case "facebook":
                const res = await this.facebookApi.authenticate(token);
                return {token: "", user: {id: "", email: ""}};
            default:
                return new Promise(() => {
                    throw new BadRequestException("Bad request")
                });
        }
    }

    public async login(email: string, password: string) {
        const user = await this.userStore.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        } else {
            const localData: LocalLogin | undefined = await this.loginStore.findOneLocal(user);
            if (!localData) {
                throw new UnauthorizedException('User not found');
            } else {
                if (!await CryptoUtils.checkPassword(localData.passwordHash, localData.salt, password))
                    throw new UnauthorizedException('Invalid password');

                return await this.createSession(user);
            }
        }
    }

    public async loginSocial(type: string, token: string) {
        switch (type) {
            case "facebook":
                const res = await this.facebookApi.authenticate(token);
                return {token: "", user: {id: "", email: ""}};
            default:
                return new Promise(() => {
                    throw new BadRequestException("Bad request")
                });
        }
    }

    private async createSession(user: User) {
        const token = CryptoUtils.createToken();
        const session = await this.sessionStore.createSession(token, user);
        return mapDbSession(session);
    }
}
