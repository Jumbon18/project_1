import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormFactory } from './data/database/typeorm.factory';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/user/user.module';

import { UserController } from './presentation/api/controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useClass: TypeormFactory,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [
    UserController
  ],
})
export class AppModule {
}
