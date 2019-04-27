import {Controller, Post, Req, UseGuards, Body} from "@nestjs/common";
import {ApiOkResponse, ApiUseTags} from "@nestjs/swagger";
import AuthGuard from "presentation/api/guards/AuthGuard";
import User from "presentation/api/entities/User";
import IAuthService from "presentation/api/services/IAuthService";
import {Request} from 'express';
import {mapToApiUser} from "presentation/mappers/ApiMappers";

@ApiUseTags("Users")
@Controller("api/users")
export class UsersController {
    constructor(
        private readonly authService: IAuthService,
    ) {
    }

    @Post('me')
    @UseGuards(AuthGuard)
    @ApiOkResponse({type: User})
    public async getCurrentUser(@Req() request: Request): Promise<User> {
        const session = await this.authService.getSessionOrThrow(request);
        return mapToApiUser(session.user);
    }
}
