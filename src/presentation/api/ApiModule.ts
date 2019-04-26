import {Module} from "@nestjs/common";
import {AuthController} from "presentation/api/controllers/AuthController";
import {AuthModule} from "domain/auth/AuthModule";
import {UsersController} from "presentation/api/controllers/UsersController";
import {ServiceModule} from "presentation/api/services/ServiceModule";
import {MailerManagerModule} from "domain/mailerManager/MailerManagerModule";

@Module({
    imports: [
        AuthModule,
        ServiceModule,
        MailerManagerModule,
    ],
    controllers: [
        AuthController,
        UsersController,
    ],
})
export class ApiModule {}
