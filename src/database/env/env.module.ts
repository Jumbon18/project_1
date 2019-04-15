import { join } from 'path';
import { Module } from '@nestjs/common';
import { EnvService } from './env.service';

@Module({
  providers: [
    {
      provide: EnvService,
      useValue: new EnvService(
        process.env.NODE_ENV === 'production' ? '../.env.example' : '.env.example',
      ),
    },
  ],
  exports: [EnvService],
})
export class EnvModule {}
