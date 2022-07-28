import { PaginationMetadata } from './paginationMetadata';

export interface PagedListRequest extends Pick<PaginationMetadata, 'pageSize'> {
  pageNumber: number;
}
