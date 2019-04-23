import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmFactory} from "data/database/config/TypeOrmFactory";
import Session from "data/database/entities/Session";
import User from "data/database/entities/User";
import LocalLogin from "data/database/entities/LocalLogin";
import FacebookLogin from "data/database/entities/FacebookLogin";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [],
            useClass: TypeOrmFactory,
        }),
        TypeOrmModule.forFeature([
            User,
            Session,
            LocalLogin,
            FacebookLogin,
        ]),
    ],
    exports: []
})
export class DatabaseModule {}
