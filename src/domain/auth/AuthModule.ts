import {Module} from '@nestjs/common';
import {AuthManager} from 'domain/auth/AuthManager';
import {StoresModule} from "data/stores/StoresModule";

@Module({
    imports: [
        StoresModule,
    ],
    providers: [
        AuthManager,
    ],
    exports: [
        AuthManager,
    ],
})
export class AuthModule {
    constructor() {}
}
