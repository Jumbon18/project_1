import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {IAuthManager} from "domain/auth/IAuthManager";

@Injectable()
export default class AuthGuard implements CanActivate {
    constructor(private readonly authManager: IAuthManager) {
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers;

        const authorizationToken: string | undefined = headers["authorization"];
        if (!authorizationToken) return false;

        const session = await this.authManager.getSession(authorizationToken);

        return !!session;
    }
}
