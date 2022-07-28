import 'react-credit-cards/es/styles-compiled.css';

import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import {
  Box,
  Button,
  Container,
  Modal,
  SimpleGrid,
  Title,
} from '@mantine/core';

import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { useAppPagination } from '../../../../hooks';
import { PaymentMethod } from '../../../../models/payment';
import { PaymentMethodCreationDto } from '../../../../shared/dtos/payment';
import { userDetailsSelector } from '../../../user/userSlice';
import { PaymentMethodCardView } from '../../components/PaymentMethodCardView';
import { PaymentMethodManipulatingForm } from '../../components/PaymentMethodManipulatingForm';
import { useAddNewPaymentMethod } from '../../hooks';
import styles from './PaymentMethodListManagement.module.css';

export function PaymentMethodListManagement() {
  const { paymentsService } = useContext(ApplicationContext);
  const { pageNumber, pageSize, onPaginationMetaChange } = useAppPagination();

  const { id: userId } = useSelector(userDetailsSelector);

  const [manipulatingForm, setManipulatingForm] = useState<{
    opened: boolean;
    paymentMethod?: PaymentMethod;
  }>({ opened: false });

  const { data, isLoading, isError } = useQuery(
    ['users', userId, 'payment-methods', pageNumber, pageSize],
    async () => {
      // TODO: get scope
      // const accessToken = await getAccessToken({});

      const accessToken = '';

      const { data, pagination } =
        await paymentsService.getPaymentMethodsForUser(
          userId,
          { pageNumber, pageSize },
          accessToken,
        );

      onPaginationMetaChange(pagination);
      return data;
    },
  );

  const { mutateAsync: addNewPaymentMethod, isLoading: adding } =
    useAddNewPaymentMethod();

  const onManipulatingFormOpen = (paymentMethod?: PaymentMethod) => {
    setManipulatingForm({ opened: true, paymentMethod });
  };

  const onManipulatingFormClose = () => {
    setManipulatingForm({ opened: false, paymentMethod: undefined });
  };

  const onSubmit = async (dto: PaymentMethodCreationDto) => {
    await addNewPaymentMethod(dto);
    onManipulatingFormClose();
  };

  return (
    <>
      <Container size="xl" className={styles.container}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Title order={2} style={{ fontWeight: 900 }}>
            Your credit cards
          </Title>

          <Button
            size="xs"
            color="orange"
            onClick={() => onManipulatingFormOpen()}
          >
            Add a new credit card
          </Button>
        </Box>

        <Wrapper<PaymentMethod[]>
          loading={isLoading}
          data={data}
          type="page"
          hasError={isError}
        >
          <SimpleGrid cols={3} spacing={40}>
            {(data || []).map((paymentMethod) => (
              <PaymentMethodCardView
                paymentMethod={paymentMethod}
                key={paymentMethod.id}
              />
            ))}
          </SimpleGrid>
        </Wrapper>
      </Container>

      <Modal
        title="Add new credit card"
        opened={manipulatingForm.opened}
        onClose={onManipulatingFormClose}
        centered
      >
        <PaymentMethodManipulatingForm
          paymentMethod={manipulatingForm.paymentMethod}
          onSubmit={onSubmit}
          adding={adding}
        />
      </Modal>
    </>
  );
}
