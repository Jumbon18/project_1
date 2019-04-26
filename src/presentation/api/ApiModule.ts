import {Module} from "@nestjs/common";
import {AuthController} from "presentation/api/controllers/AuthController";
import {AuthModule} from "domain/auth/AuthModule";
import {UsersController} from "presentation/api/controllers/UsersController";
import {ServiceModule} from "presentation/api/services/ServiceModule";

@Module({
    imports: [
        AuthModule,
        ServiceModule,
    ],
    controllers: [
        AuthController,
        UsersController,
    ],
})
export class ApiModule {}
