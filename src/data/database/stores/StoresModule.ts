import {Module} from '@nestjs/common';
import {UserStore} from "data/database/stores/UserStore";
import {SessionStore} from "data/database/stores/SessionStore";
import {DatabaseModule} from "data/database/DatabaseModule";

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        UserStore,
        SessionStore,
    ],
    exports: [
        UserStore,
        SessionStore,
    ],
})
export class StoresModule {}
