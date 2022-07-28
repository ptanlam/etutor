import { useContext } from 'react';
import { UseMutateAsyncFunction, useQuery } from 'react-query';

import { Box, Container, Image, Text, Title } from '@mantine/core';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { ErrorIndicator } from '../../../../components/ErrorIndicator';
import { ApplicationContext } from '../../../../contexts';
import { EnrollmentCreationDto } from '../../../../shared/dtos/enrollment';
import { OrderCreationDto } from '../../../../shared/dtos/payment';
import styles from './CheckoutForm.module.css';

type Props = {
  dto: EnrollmentCreationDto;
  createOrder: UseMutateAsyncFunction<
    string,
    unknown,
    OrderCreationDto,
    unknown
  >;
  onOrderApprove: (orderId: string) => Promise<void>;
};

export function CheckoutForm({ dto, createOrder, onOrderApprove }: Props) {
  const { tuitionAmount, tuitionUnit, courseId, tutorId } = dto;

  const renderDetails = () => {
    if (!!courseId) return <CourseDetails id={courseId} />;
    else if (!!tutorId) return <TutorDetails id={tutorId} dto={dto} />;
    return <ErrorIndicator />;
  };

  return (
    <Container size="md" className={styles.container}>
      {renderDetails()}

      <PayPalButtons
        createOrder={() =>
          createOrder({ costAmount: tuitionAmount, costUnit: tuitionUnit })
        }
        onApprove={async (data) => onOrderApprove(data.orderID)}
      />
    </Container>
  );
}

function CourseDetails({ id }: { id: string }) {
  const { coursesService } = useContext(ApplicationContext);

  const { data } = useQuery(['courses', id], () =>
    coursesService.getCourseDetails(id)
  );

  return (
    <Box className={styles.detailsContainer}>
      <Text>Thank you for choosing us</Text>

      <Image
        src={data?.thumbnail?.url}
        height={400}
        className={styles.courseThumbnail}
      />
      <Title order={2} style={{ fontWeight: 900 }}>
        {data?.subjectName}
      </Title>
      <Text>{data?.name}</Text>
      <Text>
        Tuition: {data?.tuitionFeeAmount} {data?.tuitionFeeUnit}
      </Text>
    </Box>
  );
}

function TutorDetails({ id, dto }: { id: string; dto: EnrollmentCreationDto }) {
  const { tutorsService } = useContext(ApplicationContext);

  const { data } = useQuery(['tutors', id], () => tutorsService.getDetails(id));

  return (
    <Box className={styles.detailsContainer}>
      <Text>Thank you for choosing us</Text>

      <Image
        src={data?.images?.[0]?.url}
        height={400}
        className={styles.courseThumbnail}
      />

      <Title order={2} style={{ fontWeight: 900 }}>
        {data?.fullName}
      </Title>
      <Text>Tutor booking</Text>
      <Text>
        Tuition: {dto?.tuitionAmount} {dto?.tuitionUnit}
      </Text>
    </Box>
  );
}
