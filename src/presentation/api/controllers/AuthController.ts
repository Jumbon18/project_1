import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {CreateUserDto} from 'presentation/api/entities/CreateUserDto';
import {IAuthManager} from "domain/auth/IAuthManager";

@Controller("api")
export class AuthController {
    constructor(
        private readonly authManager: IAuthManager,
    ) {}

    @Post('register')
    public async register(@Body() userDto: CreateUserDto) {
        return await this.authManager.register(userDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() userDto: CreateUserDto) {
        return await this.authManager.login(userDto.email, userDto.password);
    }
}
