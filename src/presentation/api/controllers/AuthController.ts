import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthManager} from 'domain/auth/AuthManager';
import {CreateUserDto} from 'presentation/api/entities/CreateUserDto';

@Controller("api")
export class AuthController {
    constructor(
        private readonly authManager: AuthManager,
    ) {}

    @Post('register')
    public async register(@Body() userDto: CreateUserDto) {
        return await this.authManager.register(userDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() userDto: CreateUserDto) {
        return await this.authManager.login(userDto);
    }
}
