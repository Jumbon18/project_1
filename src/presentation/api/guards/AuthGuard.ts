import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import IAuthService from "presentation/api/services/IAuthService";

@Injectable()
export default class AuthGuard implements CanActivate {
    constructor(private readonly authService: IAuthService) {
    }

    async canActivate(context: ExecutionContext) {
        const session = await this.authService.getSession(context);

        return !!session;
    }
}
