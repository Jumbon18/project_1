import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CryptoUtils} from 'domain/auth/CryptoUtils';
import {IAuthManager} from "domain/auth/IAuthManager";
import User from "data/database/entities/User";
import {mapFromDbSession} from "domain/mappers/DbMappers";
import IUserStore from "data/database/stores/IUserStore";
import ISessionStore from "data/database/stores/ISessionStore";
import ILoginStore from "data/database/stores/ILoginStore";
import {SocialAuthType} from "entities/SocialAuthType";
import IFacebookApi from "data/api/facebook/IFacebookApi";
import PasswordUtils from "domain/auth/PasswordUtils";
import {IMailerManager} from "domain/mailer/IMailerManager";

@Injectable()
export class AuthManager extends IAuthManager {
    constructor(
        private readonly userStore: IUserStore,
        private readonly loginStore: ILoginStore,
        private readonly sessionStore: ISessionStore,
        private readonly facebookApi: IFacebookApi,
        private readonly mailerManager: IMailerManager,
    ) {
        super();
    }

    public async registerLocal(email: string, password: string) {
        const {passwordHash, salt} = await CryptoUtils.hashPassword(password);
        if (await this.userStore.findUser(email)) {
            throw new UnauthorizedException('Such user already exists');
        }
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
                throw new BadRequestException();
            }
        }
    }

    private async registerFacebook(token: string) {
        const {email, id} = await this.facebookApi.authenticate(token);
        if (await this.userStore.findUser(email)) {
            throw new UnauthorizedException('Such user already exists');
        }
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

    public async forgotPassword(email: string) {
        const localLogin = await this.loginStore.findLocalLogin(email);
        if (!localLogin) {
            throw new BadRequestException("Cannot find user registered with this email. Try another email or Facebook authentication.");
        }

        const generatedPassword = PasswordUtils.generate();
        await this.mailerManager.sendNewPassword(email, generatedPassword);

        const {passwordHash, salt} = await CryptoUtils.hashPassword(generatedPassword);
        await this.loginStore.updateLocalLogin(email, {passwordHash, salt});
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
