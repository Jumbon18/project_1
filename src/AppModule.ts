import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormFactory } from 'data/database/TypeormFactory';
import { AuthModule } from 'domain/auth/AuthModule';
import { UserModule } from 'domain/user/UserModule';
import { UserController } from 'presentation/api/controllers/user.controller';

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
