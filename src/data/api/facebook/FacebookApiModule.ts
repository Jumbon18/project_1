import {Module} from '@nestjs/common';
import FacebookApi from "data/api/facebook/FacebookApi";
import IFacebookApi from "data/api/facebook/IFacebookApi";

@Module({
    providers: [
        {
            provide: IFacebookApi,
            useClass: FacebookApi,
        },
    ],
    exports: [
        IFacebookApi,
    ],
})
export class FacebookApiModule {}
