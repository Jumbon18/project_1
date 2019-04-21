import {Module} from "@nestjs/common";
import {AuthController} from "presentation/api/controllers/AuthController";
import {AuthModule} from "domain/auth/AuthModule";

@Module({
    imports: [
        AuthModule,
    ],
    controllers: [
        AuthController,
    ],
})
export class ApiModule {}
