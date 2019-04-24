import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CryptoUtils} from 'domain/auth/CryptoUtils';
import {IAuthManager} from "domain/auth/IAuthManager";
import User from "data/database/entities/User";
import {mapFromDbSession} from "domain/mappers/DbMappers";
import IUserStore from "data/database/stores/IUserStore";
import ISessionStore from "data/database/stores/ISessionStore";
import FacebookApi from "data/api/facebook/FacebookApi"
import ILoginStore from "data/database/stores/ILoginStore";
import {SocialAuthType} from "entities/SocialAuthType";

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

    public async registerLocal(email: string, password: string) {
        const {passwordHash, salt} = await CryptoUtils.hashPassword(password);
        const user = await this.userStore.createUser(email);
        await this.loginStore.createLocalLogin(user, email, passwordHash, salt);

        return await this.createSession(user);
    }

    public async registerSocial(type: SocialAuthType, token: string) {
        switch (type) {
            case SocialAuthType.Facebook: {
                return await this.registerFacebook(token);
            }
            default: {
                throw new BadRequestException()
            }
        }
    }

    private async registerFacebook(token: string) {
        const {email, id} = await this.facebookApi.authenticate(token);
        const user = await this.userStore.createUser(email);
        await this.loginStore.createFacebookLogin(user, id);

        return await this.createSession(user);
    }

    public async loginLocal(email: string, password: string) {
        const login = await this.loginStore.findLocalLogin(email);
        if (!login) {
            throw new UnauthorizedException('Login not found');
        }

        if (!await CryptoUtils.checkPassword(login.passwordHash, login.salt, password)) {
            throw new UnauthorizedException('Invalid password');
        }

        console.log(login);
        return await this.createSession(login.user);
    }

    public async loginSocial(type: SocialAuthType, token: string) {
        switch (type) {
            case SocialAuthType.Facebook: {
                return await this.loginFacebook(token);
            }
            default: {
                throw new BadRequestException()
            }
        }
    }

    private async loginFacebook(token: string) {
        const {id} = await this.facebookApi.authenticate(token);
        const login = await this.loginStore.findFacebookLogin(id);
        if (!login) {
            throw new UnauthorizedException('Login not found');
        }

        return await this.createSession(login.user);
    }

    async getSession(token: string) {
        const session = await this.sessionStore.findSession(token);
        if (!session) return;
        return mapFromDbSession(session);
    }

    private async createSession(user: User) {
        const token = CryptoUtils.createToken();
        const session = await this.sessionStore.createSession(token, user);
        return mapFromDbSession(session);
    }
}
