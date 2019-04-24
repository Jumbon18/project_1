import {Module} from '@nestjs/common';
import IAuthService from "presentation/api/services/IAuthService";
import {AuthModule} from "domain/auth/AuthModule";

@Module({
    imports: [
        AuthModule,
    ],
    providers: [
        IAuthService,
    ],
    exports: [
        IAuthService,
    ],
})
export class ServiceModule {
}
