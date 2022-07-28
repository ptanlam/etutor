import { useContext } from 'react';
import { useQuery } from 'react-query';

import { Container, Title } from '@mantine/core';

import { useAppSelector } from '../../../../app/hooks';
import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { useAppPagination } from '../../../../hooks';
import { Transaction } from '../../../../models/payment';
import { userDetailsSelector } from '../../../user/userSlice';
import { StudentTransactionList } from '../../components/StudentTransactionList';

export function StudentTransactionListManagement() {
  const { paymentsService } = useContext(ApplicationContext);

  const { pageNumber, pageSize, onPaginationMetaChange } = useAppPagination();
  const { id } = useAppSelector(userDetailsSelector);

  const { data, isLoading, isError } = useQuery(
    ['users', id, 'transactions'],
    async ({ signal }) => {
      const response = await paymentsService.getTransactionsForOwner(
        id,
        { pageNumber, pageSize },
        signal,
      );

      onPaginationMetaChange(response.pagination);
      return response.data;
    },
  );

  return (
    <Container
      size="xl"
      style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      <Title order={2} style={{ fontWeight: 900 }}>
        Your transactions
      </Title>

      <Wrapper<Transaction[]>
        type="page"
        data={data}
        loading={isLoading}
        hasError={isError}
      >
        <StudentTransactionList transactions={data || []} />
      </Wrapper>
    </Container>
  );
}
