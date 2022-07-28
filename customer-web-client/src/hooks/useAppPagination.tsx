import { useState } from 'react';

import { PaginationMetadata } from '../models/shared';

export function useAppPagination(
  pageNumber: number = 1,
  pageSize: number = 10
) {
  const [paginationMetadata, setPaginationMetadata] =
    useState<PaginationMetadata>({
      totalCount: 0,
      pageNumber,
      pageSize,
      totalPage: 0,
    });

  const onPaginationMetaChange = (pagination: PaginationMetadata) => {
    setPaginationMetadata((prevState) => ({ ...prevState, ...pagination }));
  };

  const onPageChange = (pageNumber: number) => {
    setPaginationMetadata((prevState) => ({
      ...prevState,
      pageNumber,
    }));
  };

  return {
    ...paginationMetadata,
    onPageChange,
    onPaginationMetaChange,
  };
}
