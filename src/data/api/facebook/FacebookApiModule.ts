import {Module} from '@nestjs/common';
import FacebookApi from "data/api/facebook/FacebookApi";

@Module({
    providers: [
      FacebookApi,
    ],
    exports: [
        FacebookApi,
    ],
})
export class FacebookApiModule {}
