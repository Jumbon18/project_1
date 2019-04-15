import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './database/typeorm.service';
import { EnvModule } from './database/env/env.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    // services
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      useClass: TypeOrmService,
    }),
    EnvModule,

    // api routes
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
