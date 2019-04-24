import {Controller, Post, Req, UseGuards} from "@nestjs/common";
import {ApiOkResponse, ApiUseTags} from "@nestjs/swagger";
import AuthGuard from "presentation/api/guards/AuthGuard";
import User from "presentation/api/entities/User";
import IAuthService from "presentation/api/services/IAuthService";
import {Request} from 'express';

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
        const session = await this.authService.getSession(request);
        if (!session) {
            throw new Error("Cannot find user");
        }
        return {id: session.user.id, email: session.user.email};
    }
}
