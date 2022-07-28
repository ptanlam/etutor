import { Observable, map, mergeMap, from, toArray } from 'rxjs';

import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { StorageService } from '../storage/storage.service';
import { FilesService } from './files.service';
import { GetAllForOwnerRequest } from './interfaces/getAllForOwnerRequest.interface';
import { GetAllForOwnerResponse } from './interfaces/getAllForOwnerResponse.interface';
import { UploadFilesForOwnerRequest } from './interfaces/uploadFilesForOwnerRequest.interface';
import { UploadFilesForOwnerResponse } from './interfaces/uploadFilesForOwnerResponse.interface';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(
    private readonly _filesService: FilesService,
    private readonly _storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  upload(@UploadedFiles() files: Express.Multer.File[]) {
    return from(files).pipe(
      map(({ buffer, originalname, mimetype }) => ({
        buffer,
        filename: originalname,
        mimetype,
      })),
      toArray(),
      mergeMap((files) => this._storageService.uploadMany(files)),
    );
  }

  @GrpcMethod('Files')
  getAllForOwner(
    data: GetAllForOwnerRequest,
  ): Observable<GetAllForOwnerResponse> {
    return this._filesService
      .getAllForOwner(data.ownerId)
      .pipe(map((files) => ({ files })));
  }

  @GrpcMethod('Files')
  uploadForOwner(
    data: UploadFilesForOwnerRequest,
  ): Observable<UploadFilesForOwnerResponse> {
    const { ownerId, files } = data;

    return this._storageService
      .uploadMany(files)
      .pipe(
        mergeMap((files) =>
          this._filesService
            .saveFiles(ownerId, files)
            .pipe(map(() => ({ files }))),
        ),
      );
  }
}
