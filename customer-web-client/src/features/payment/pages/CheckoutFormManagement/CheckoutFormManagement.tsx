import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Modal, Text, Title } from '@mantine/core';

import { useAppDocumentTitle } from '../../../../hooks';
import { EnrollmentCreationDto } from '../../../../shared/dtos/enrollment';
import { useCreateEnrollment } from '../../../enrollment/hooks';
import { CheckoutForm } from '../../components/CheckoutForm';
import { useCaptureOrder, useCreateNewOrder } from '../../hooks';

export function CheckoutFormManagement() {
  useAppDocumentTitle('Checkout');

  const { state } = useLocation();
  const enrollmentCreationDto = state as EnrollmentCreationDto;
  const [modalOpened, setModalOpened] = useState(false);

  const navigate = useNavigate();

  const { mutateAsync: createOrder } = useCreateNewOrder();
  const { mutateAsync: captureOrder } = useCaptureOrder();
  const { mutateAsync: enroll } = useCreateEnrollment();

  const onOrderApprove = async (orderId: string) => {
    await captureOrder(orderId);
    await enroll(enrollmentCreationDto);
    setModalOpened(true);
  };

  return (
    <>
      <CheckoutForm
        dto={enrollmentCreationDto}
        createOrder={createOrder}
        onOrderApprove={onOrderApprove}
      />

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={<Title order={4}>Successful Payment</Title>}
        centered
      >
        <Box style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Text>Your payment has been processed successfully.</Text>

          <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <Button size="xs" variant="outline" onClick={() => navigate('/')}>
              Back to home
            </Button>
            <Button size="xs" onClick={() => navigate('/student/schedules')}>
              Go to schedule
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
