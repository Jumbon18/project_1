import {Module} from '@nestjs/common';
import IAuthService from "presentation/api/services/IAuthService";

@Module({
    providers: [
        IAuthService,
    ],
    exports: [
        IAuthService,
    ],
})
export class ServiceModule {
}
