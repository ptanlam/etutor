export interface UploadFilesForOwnerResponse {
  files: Array<{ url: string; filename: string; mimetype: string }>;
}
