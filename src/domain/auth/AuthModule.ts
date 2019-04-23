import {Module} from '@nestjs/common';
import {AuthManager} from 'domain/auth/AuthManager';
import {StoresModule} from "data/database/stores/StoresModule";
import {IAuthManager} from "domain/auth/IAuthManager";
import {FacebookApiModule} from "data/api/facebook/FacebookApiModule";

@Module({
    imports: [
        FacebookApiModule,
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
