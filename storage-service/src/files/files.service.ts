import { Inject, Injectable } from '@nestjs/common';
import { from, mergeMap, of, toArray } from 'rxjs';
import { File } from 'src/files/entities/file.entity';
import { v4 as uuidV4 } from 'uuid';
import { filesRepositoryProvideToken } from '../constants';

@Injectable()
export class FilesService {
  constructor(
    @Inject(filesRepositoryProvideToken)
    private _filesRepository: typeof File,
  ) {}

  saveFiles(
    ownerId: string,
    files: Array<{ url: string; filename: string; mimetype: string }>,
  ) {
    return from(files).pipe(
      mergeMap(({ url, filename, mimetype }) =>
        this.saveFile(ownerId, url, filename, mimetype).pipe(toArray()),
      ),
    );
  }

  getAllForOwner(ownerId: string) {
    return from(this._filesRepository.findAll({ where: { ownerId } })).pipe(
      mergeMap((files) => from(files)),
      toArray(),
    );
  }

  private saveFile(
    ownerId: string,
    url: string,
    filename: string,
    mimetype: string,
  ) {
    return of(
      this._filesRepository.build({
        id: uuidV4(),
        ownerId,
        url,
        filename,
        mimetype,
      }),
    ).pipe(mergeMap((file) => from(file.save())));
  }
}
