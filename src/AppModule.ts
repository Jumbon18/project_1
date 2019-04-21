import {Module} from '@nestjs/common';
import {ApiModule} from "presentation/api/ApiModule";

@Module({
    imports: [
        ApiModule,
    ],
})
export class AppModule {}
