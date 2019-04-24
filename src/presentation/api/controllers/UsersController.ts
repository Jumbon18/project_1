import {Controller, Post, UseGuards} from "@nestjs/common";
import {ApiOkResponse, ApiUseTags} from "@nestjs/swagger";
import AuthGuard from "presentation/api/guards/AuthGuard";
import User from "presentation/api/entities/User";
import IAuthService from "presentation/api/services/IAuthService";

@ApiUseTags("Users")
@Controller("api")
export class UsersController {
    constructor(
        private readonly authService: IAuthService,
    ) {
    }

    @Post('users/me')
    @UseGuards(AuthGuard)
    @ApiOkResponse({type: User})
    public async pingUser(): Promise<User> {
        const session = await this.authService.getSession("todo");
        if (!session) {
            throw new Error("Cannot find user");
        }
        return {id: session.user.id, email: session.user.email};
    }
}
