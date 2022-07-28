import React, { useContext, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { Container, Pagination } from '@mantine/core';

import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { useAppPagination } from '../../../../hooks';
import { PagedListRequestFromQuery } from '../../../../models/shared';
import { Tutor } from '../../../../models/tutor';
import { TutorListSearchingDto } from '../../../../shared/dtos/tutor';
import { parseSearchParams, tryParseInt } from '../../../../utils';
import { TutorBookingForm } from '../../components/TutorBookingForm';
import { TutorList } from '../../components/TutorList';
import { TutorListContextProvider } from '../../contexts';
import styles from './TutorListManagement.module.css';

export function TutorListManagement() {
  const { tutorsService } = useContext(ApplicationContext);

  const [params] = useSearchParams();

  const conditions = useMemo(
    () =>
      parseSearchParams<TutorListSearchingDto & PagedListRequestFromQuery>(
        params,
      ),
    [params],
  );

  const { pageSize } = conditions;
  const { totalPage, pageNumber, onPaginationMetaChange, onPageChange } =
    useAppPagination(tryParseInt(conditions.pageNumber), tryParseInt(pageSize));

  const {
    data: response,
    isFetching,
    isError,
  } = useQuery(
    ['tutors', params],
    async ({ signal }) => {
      const response = await tutorsService.getListByConditions(
        conditions,
        signal,
      );

      onPaginationMetaChange(response?.pagination);
      return response;
    },
    { refetchOnWindowFocus: false },
  );

  const [bookingForm, setBookingForm] = useState<{
    opened: boolean;
    tutor: Partial<Tutor>;
  }>({ opened: false, tutor: {} });

  const bookTutor = (tutor: Tutor) => {
    setBookingForm((prev) => ({ ...prev, opened: true, tutor }));
  };

  const onBookingFormClose = () => {
    setBookingForm((prev) => ({ ...prev, opened: false, tutor: {} }));
  };

  const hasData = !isFetching && !!response?.data && !!response.data.length;

  return (
    <TutorListContextProvider bookTutor={bookTutor}>
      <Container size="lg" className={styles.container}>
        <Wrapper<Tutor[]>
          type="page"
          data={response?.data}
          loading={isFetching}
          hasError={isError}
        >
          <TutorList list={response?.data ?? []} />
        </Wrapper>

        {hasData && (
          <Pagination
            total={totalPage}
            page={pageNumber}
            onChange={onPageChange}
          />
        )}
      </Container>

      <TutorBookingForm {...bookingForm} onClose={onBookingFormClose} />
    </TutorListContextProvider>
  );
}
