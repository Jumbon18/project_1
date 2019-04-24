import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import IAuthService from "presentation/api/services/IAuthService";
import {Request} from "express";

@Injectable()
export default class AuthGuard implements CanActivate {
    constructor(private readonly authService: IAuthService) {
    }

    async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const session = await this.authService.getSession(request);
        return !!session;
    }
}
