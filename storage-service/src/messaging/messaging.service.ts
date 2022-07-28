import { mergeMap } from 'rxjs';

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { FilesService } from '../files/files.service';
import { StorageService } from '../storage/storage.service';
import { FileListUploadRequestDto } from './dtos/filesUploadRequestDto';

@Injectable()
export class MessagingService {
  constructor(
    private readonly _storageService: StorageService,
    private readonly _filesService: FilesService,
  ) {}

  @RabbitSubscribe({
    exchange: 'storage',
    queue: 'storage-upload-queue',
    routingKey: 'storage.command.upload',
  })
  public uploadRequestHandler({ message }: FileListUploadRequestDto) {
    this._storageService
      .uploadMany(message.files)
      .pipe(
        mergeMap((urls) => this._filesService.saveFiles(message.ownerId, urls)),
      )
      .subscribe();
  }
}
