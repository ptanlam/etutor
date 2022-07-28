import { PaginationMetadata } from './paginationMetadata';

export interface ResponseWithPagination<T> {
  data: T[];
  pagination: PaginationMetadata;
}
