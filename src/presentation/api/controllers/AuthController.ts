import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {IAuthManager} from "domain/auth/IAuthManager";
import RegisterRequest from "presentation/api/entities/auth/RegisterRequest";
import Session from "presentation/api/entities/Session";
import LoginRequest from "presentation/api/entities/auth/LoginRequest";
import {mapToApiSession} from "presentation/mappers/ApiMappers";
import SocialLoginRequest from "presentation/api/entities/auth/SocialLoginRequest";
import SocialRegisterRequest from "presentation/api/entities/auth/SocialRegisterRequest";
import {ApiOkResponse, ApiUseTags} from "@nestjs/swagger";
import AuthGuard from "presentation/api/guards/AuthGuard";

@ApiUseTags("Auth")
@Controller("api")
export class AuthController {
    constructor(
        private readonly authManager: IAuthManager,
    ) {
    }

    @Post('register')
    @ApiOkResponse({type: Session})
    public async register(@Body() {email, password}: RegisterRequest): Promise<Session> {
        const session = await this.authManager.registerLocal(email, password);
        return mapToApiSession(session);
    }

    @Post('register/social')
    @ApiOkResponse({type: Session})
    public async registerSocial(@Body() {type, token}: SocialRegisterRequest): Promise<Session> {
        const session = await this.authManager.registerSocial(type, token);
        return mapToApiSession(session);
    }

    @Post('login')
    @ApiOkResponse({type: Session})
    public async login(@Body() {email, password}: LoginRequest): Promise<Session> {
        const session = await this.authManager.loginLocal(email, password);
        return mapToApiSession(session);
    }

    @Post('login/social')
    @ApiOkResponse({type: Session})
    public async loginSocial(@Body() {type, token}: SocialLoginRequest): Promise<Session> {
        const session = await this.authManager.loginSocial(type, token);
        return mapToApiSession(session);
    }

    @Post('ping')
    @ApiOkResponse({})
    public ping() {
    }

    @Post('ping/guard')
    @UseGuards(AuthGuard)
    @ApiOkResponse({})
    public pingGuard() {
    }
}
