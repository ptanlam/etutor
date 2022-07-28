import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import s3Config from './s3.config';
import { StorageService } from './storage.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    ConfigModule.forFeature(s3Config),
    HttpModule,
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
