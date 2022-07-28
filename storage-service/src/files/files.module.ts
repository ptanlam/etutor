import { Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { FilesController } from './files.controller';
import { filesProvider } from './files.provider';
import { FilesService } from './files.service';

@Module({
  imports: [StorageModule],
  controllers: [FilesController],
  providers: [FilesService, ...filesProvider],
  exports: [FilesService, ...filesProvider],
})
export class FilesModule {}
