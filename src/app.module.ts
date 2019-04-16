import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './database/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useClass: TypeOrmService,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController,
    UserController
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
