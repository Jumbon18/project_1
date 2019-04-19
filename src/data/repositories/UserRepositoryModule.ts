import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManager } from 'domain/user/UserManager';
import { User } from 'data/database/entities/User';
import {UserRepository} from "data/repositories/UserRepository";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserManager],
    exports: [UserRepositoryModule, UserRepository],
})
export class UserRepositoryModule {}