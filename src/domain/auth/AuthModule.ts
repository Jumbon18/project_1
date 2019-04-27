import {Module} from '@nestjs/common';
import {AuthManager} from 'domain/auth/AuthManager';
import {StoresModule} from "data/database/stores/StoresModule";
import {IAuthManager} from "domain/auth/IAuthManager";
import {FacebookApiModule} from "data/api/facebook/FacebookApiModule";
import {MailerModule} from "domain/mailer/MailerModule";

@Module({
    imports: [
        FacebookApiModule,
        StoresModule,
        MailerModule,
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
