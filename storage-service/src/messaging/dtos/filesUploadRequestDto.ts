export interface FileListUploadRequestDto {
  message: {
    ownerId: string;
    files: Array<{ filename: string; buffer: Buffer; mimetype: string }>;
  };
}
