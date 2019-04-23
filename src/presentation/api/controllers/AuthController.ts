import {Body, Controller, Post} from '@nestjs/common';
import {IAuthManager} from "domain/auth/IAuthManager";
import RegisterRequest from "presentation/api/entities/auth/RegisterRequest";
import Session from "presentation/api/entities/Session";
import LoginRequest from "presentation/api/entities/auth/LoginRequest";
import {mapToApiSession} from "presentation/mappers/ApiMappers";
import SocialLoginRequest from "presentation/api/entities/auth/SocialLoginRequest";
import SocialRegisterRequest from "presentation/api/entities/auth/SocialRegisterRequest";

@Controller("api")
export class AuthController {
    constructor(
        private readonly authManager: IAuthManager,
    ) {
    }

    @Post('register')
    public async register(@Body() {email, password}: RegisterRequest): Promise<Session> {
        const session = await this.authManager.registerLocal(email, password);
        return mapToApiSession(session);
    }

    @Post('register/social')
    public async registerSocial(@Body() {type, token}: SocialRegisterRequest): Promise<Session> {
        const session = await this.authManager.registerSocial(type, token);
        return mapToApiSession(session);
    }

    @Post('login')
    public async login(@Body() {email, password}: LoginRequest): Promise<Session> {
        const session = await this.authManager.loginLocal(email, password);
        return mapToApiSession(session);
    }

    @Post('login/social')
    public async loginSocial(@Body() {type, token}: SocialLoginRequest): Promise<Session> {
        const session = await this.authManager.loginSocial(type, token);
        return mapToApiSession(session);
    }

}
