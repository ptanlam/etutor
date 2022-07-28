import { S3 } from 'aws-sdk';
import { from, map, mergeMap, toArray } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private readonly _bucket: string;
  private readonly _region: string;
  private readonly _s3Client: S3;

  constructor(
    configService: ConfigService,
    private readonly _httpService: HttpService,
  ) {
    this._bucket = configService.get('s3.bucket') || '';
    this._region = configService.get('s3.region') || '';
    this._s3Client = new S3({ signatureVersion: 'v4' });
  }

  uploadMany(
    images: Array<{ filename: string; buffer: Buffer; mimetype: string }>,
  ) {
    return from(images).pipe(
      mergeMap(({ buffer, filename, mimetype }) =>
        this.uploadV2(Buffer.from(buffer), filename, mimetype),
      ),
      toArray(),
    );
  }

  private uploadV2(buffer: Buffer, filename: string, mimetype: string) {
    return from(
      this._s3Client.getSignedUrlPromise('putObject', {
        Bucket: this._bucket,
        Key: filename,
        ContentType: mimetype,
        ACL: 'public-read',
      }),
    ).pipe(
      mergeMap((url) =>
        this._httpService.put(url, Buffer.from(buffer), {
          headers: {
            'Content-Type': mimetype,
            'x-amz-acl': 'public-read',
          },
        }),
      ),
      map(() => ({
        url: `https://${this._bucket}.s3.${this._region}.amazonaws.com/${filename}`,
        filename,
        mimetype,
      })),
    );
  }
}
