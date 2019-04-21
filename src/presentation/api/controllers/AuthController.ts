import {Body, Controller, Post} from '@nestjs/common';
import {IAuthManager} from "domain/auth/IAuthManager";
import RegisterRequest from "presentation/api/entities/auth/RegisterRequest";
import Session from "presentation/api/entities/Session";
import LoginRequest from "presentation/api/entities/auth/LoginRequest";
import {mapApiSession} from "presentation/mappers/ApiMappers";

@Controller("api")
export class AuthController {
    constructor(
        private readonly authManager: IAuthManager,
    ) {}

    @Post('register')
    public async register(@Body() {email, password}: RegisterRequest): Promise<Session> {
        const session = await this.authManager.register(email, password);
        return mapApiSession(session);
    }

    @Post('login')
    public async login(@Body() {email, password}: LoginRequest): Promise<Session> {
        const session = await this.authManager.login(email, password);
        return mapApiSession(session);
    }
}
