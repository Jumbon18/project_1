import {Module} from '@nestjs/common';
import {AuthManager} from 'domain/auth/AuthManager';
import {StoresModule} from "data/database/stores/StoresModule";
import {IAuthManager} from "domain/auth/IAuthManager";

@Module({
    imports: [
        StoresModule,
    ],
    providers: [
        {
            provide: IAuthManager,
            useClass: AuthManager,
        },
    ],
    exports: [
        IAuthManager,
    ],
})
export class AuthModule {
    constructor() {}
}
