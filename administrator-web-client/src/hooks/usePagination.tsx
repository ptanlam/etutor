import { useState } from 'react';

import { PaginationMetadata } from '../shared/models';

export function usePagination(pageSize: number = 10, currentPage: number = 1) {
  const [pagination, setPagination] = useState<PaginationMetadata>({
    pageSize,
    currentPage,
    totalCount: 0,
    totalPage: 0,
  });

  const setTotalPage = (totalPage: number) => {
    setPagination((prev) => ({ ...prev, totalPage }));
  };

  const setTotalCount = (totalCount: number) => {
    setPagination((prev) => ({ ...prev, totalCount }));
  };

  const setCurrentPage = (currentPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: currentPage + 1 }));
  };

  const setPageSize = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize }));
  };

  return {
    pagination,
    setTotalPage,
    setTotalCount,
    setCurrentPage,
    setPageSize,
  };
}
