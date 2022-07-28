import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import { Icon } from '@chakra-ui/react';

import styles from './Pagination.module.css';

type Props = Pick<ReactPaginateProps, 'pageCount'> & {
  onPageChange: (page: number) => void;
};

export function Pagination({ pageCount, onPageChange }: Props) {
  return (
    <ReactPaginate
      breakLabel="..."
      containerClassName={styles.container}
      pageLinkClassName={styles.pageLink}
      nextLinkClassName={styles.pageLink}
      previousLinkClassName={styles.pageLink}
      activeLinkClassName={styles.activePageLink}
      nextLabel={<Icon as={FiChevronRight} />}
      previousLabel={<Icon as={FiChevronLeft} />}
      onPageChange={({ selected }) => onPageChange(selected)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={() => null}
    />
  );
}
