import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManager } from './user.manager';
import { UserController } from '../../presentation/api/controllers/user.controller';
import { User } from '../../data/database/entities/entity.user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserManager],
  controllers: [UserController],
  exports: [UserModule, UserManager],
})
export class UserModule {}
