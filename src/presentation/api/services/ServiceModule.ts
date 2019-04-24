import {Module} from '@nestjs/common';
import IAuthService from "presentation/api/services/IAuthService";
import {AuthModule} from "domain/auth/AuthModule";
import AuthService from "presentation/api/services/AuthService";

@Module({
    imports: [
        AuthModule,
    ],
    providers: [
        {
            provide: IAuthService,
            useClass: AuthService,
        },
    ],
    exports: [
        IAuthService,
    ],
})
export class ServiceModule {
}
