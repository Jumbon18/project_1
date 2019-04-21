import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmFactory} from "data/database/config/TypeOrmFactory";
import Session from "data/database/entities/Session";
import User from "data/database/entities/User";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [],
            useClass: TypeOrmFactory,
        }),
        TypeOrmModule.forFeature([User, Session]),
    ],
    exports: [
    ]
})
export class DatabaseModule {}
