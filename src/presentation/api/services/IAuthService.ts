import Session from "presentation/api/entities/Session";
import {Injectable} from "@nestjs/common";
import {IAuthManager} from "domain/auth/IAuthManager";

@Injectable()
export default class IAuthService {
    constructor(private readonly authManager: IAuthManager) {
    }

    async getSession(context: any): Promise<Session | undefined> {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        const authorizationToken: string | undefined = headers["authorization"];
        if (!authorizationToken) throw new Error("Invalid token");
        return await this.authManager.getSession(authorizationToken);
    };

    public static currentRequestContext(): IAuthService {

    }
}
