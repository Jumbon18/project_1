import {Module} from '@nestjs/common';
import {UserStore} from "data/database/stores/UserStore";
import {SessionStore} from "data/database/stores/SessionStore";
import {DatabaseModule} from "data/database/DatabaseModule";
import IUserStore from "data/database/stores/IUserStore";
import ISessionStore from "data/database/stores/ISessionStore";

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        {
            provide: IUserStore,
            useClass: UserStore,
        },
        {
            provide: ISessionStore,
            useClass: SessionStore,
        },
    ],
    exports: [
        IUserStore,
        ISessionStore,
    ],
})
export class StoresModule {}
