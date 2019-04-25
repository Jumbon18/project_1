import {Injectable, NotFoundException} from "@nestjs/common";
import {IAuthManager} from "domain/auth/IAuthManager";
import IAuthService from "presentation/api/services/IAuthService";
import {Request} from "express";
import ForgotPasswordRequest from "presentation/api/entities/auth/ForgotPasswordRequest";

@Injectable()
export default class AuthService implements IAuthService {
    constructor(private readonly authManager: IAuthManager) {
    }

    async getSession(request: Request) {
        const authorizationToken = request.headers.authorization;
        if (!authorizationToken) return;
        return await this.authManager.getSession(authorizationToken);
    };

    async getSessionOrThrow(request: Request) {
        const session = await this.getSession(request);
        if (!session) throw new NotFoundException("Session is not found");
        return session;
    }
    async updateUserPassword(email: string) {
         await this.authManager.replaceLoginPasswordLocal(email);
    }
}
