export interface GetAllForOwnerResponse {
  files: Array<{
    id: string;
    ownerId: string;
    url: string;
    filename: string;
    mimetype: string;
  }>;
}
