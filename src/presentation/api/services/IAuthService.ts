import Session from "presentation/api/entities/Session";
import {Injectable} from "@nestjs/common";
import {IAuthManager} from "domain/auth/IAuthManager";
import {Request} from 'express';

@Injectable()
export default class IAuthService {
    constructor(private readonly authManager: IAuthManager) {
    }

    async getSession(request: Request): Promise<Session | undefined> {
        const headers = request.headers;
        const authorizationToken = headers.authorization;
        if (!authorizationToken) throw new Error("Invalid token");
        return await this.authManager.getSession(authorizationToken);
    };
}
