import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './database/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    // services
    TypeOrmModule.forRootAsync({
      imports: [],
      useClass: TypeOrmService,
    }),

    // api routes
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
