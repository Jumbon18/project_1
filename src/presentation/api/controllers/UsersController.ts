import {Controller, Post, Req, Put, UseGuards, Body, HttpCode} from "@nestjs/common";
import {ApiOkResponse, ApiUseTags} from "@nestjs/swagger";
import AuthGuard from "presentation/api/guards/AuthGuard";
import User from "presentation/api/entities/User";
import IAuthService from "presentation/api/services/IAuthService";
import {Request} from 'express';
import {mapToApiUser} from "presentation/mappers/ApiMappers";
import ForgotPasswordRequest from "presentation/api/entities/auth/ForgotPasswordRequest";
import {IMailerManager} from "domain/mailerManager/IMailerManager";

@ApiUseTags("Users")
@Controller("api/users")
export class UsersController {
    constructor(
        private readonly authService: IAuthService,
        private readonly mailerManager: IMailerManager
    ) {
    }

    @Post('me')
    @UseGuards(AuthGuard)
    @ApiOkResponse({type: User})
    public async getCurrentUser(@Req() request: Request): Promise<User> {
        const session = await this.authService.getSessionOrThrow(request);
        return mapToApiUser(session.user);
    }

    @Post('forgotPassword')
    @ApiOkResponse({})
    public async changeUserPassword(@Body() request: ForgotPasswordRequest): Promise<void> {
        const email = request.email;
        await this.mailerManager.sendNewPassword(email);
    }
}
