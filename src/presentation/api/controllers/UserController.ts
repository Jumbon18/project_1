import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {ApiOkResponse, ApiUseTags} from "@nestjs/swagger";
import AuthGuard from "presentation/api/guards/AuthGuard";
import User from "presentation/api/entities/User";
import {IAuthManager} from "domain/auth/IAuthManager";

@ApiUseTags("Auth")
@Controller("api")
export class UserController {
    constructor(
        private readonly authManager: IAuthManager,
    ) {
    }

    @Post('users/me')
    @UseGuards(AuthGuard)
    @ApiOkResponse({type: User})
    public async pingUser(@Body() token: string): Promise<User> {
        const user = await this.authManager.getUser(token);
        if (!user) {
            throw new Error("Cannot find user");
        }
        return user;
    }
}
