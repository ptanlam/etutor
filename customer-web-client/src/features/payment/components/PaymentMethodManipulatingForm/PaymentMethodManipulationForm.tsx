import React from 'react';
import Cards from 'react-credit-cards';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, InputWrapper, SimpleGrid } from '@mantine/core';

import { PaymentMethod } from '../../../../models/payment';
import { PaymentMethodCreationDto } from '../../../../shared/dtos/payment';
import styles from './PaymentMethodManipulatingForm.module.css';

type Props = {
  paymentMethod?: PaymentMethod;
  onSubmit: (dto: PaymentMethodCreationDto) => Promise<void>;
  adding: boolean;
};

const schema = yup.object({
  cardNumber: yup.string().length(16).required('Card number is required'),
  cvc: yup.string().length(3).required('CVC is required'),
  name: yup.string().max(250).required('Name is required'),
  expiry: yup.string().max(10).required('Expiry is required'),
});

export function PaymentMethodManipulatingForm({
  paymentMethod,
  onSubmit,
  adding,
}: Props) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<PaymentMethodCreationDto>({
    defaultValues: {
      cvc: paymentMethod?.cvc || '',
      cardNumber: paymentMethod?.cardNumber || '',
      expiry: paymentMethod?.expiry || '',
      name: paymentMethod?.name || '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box className={styles.container}>
      <Cards
        number={watch('cardNumber')}
        cvc={watch('cvc')}
        name={watch('name')}
        expiry={watch('expiry')}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid cols={1}>
          <InputWrapper label="card number" error={errors.cardNumber?.message}>
            <Input {...register('cardNumber')} maxLength={16} />
          </InputWrapper>

          <SimpleGrid cols={2}>
            <InputWrapper label="expiry" error={errors.expiry?.message}>
              <Input {...register('expiry')} maxLength={10} />
            </InputWrapper>
            <InputWrapper label="cvc" error={errors.cvc?.message}>
              <Input {...register('cvc')} maxLength={3} />
            </InputWrapper>
          </SimpleGrid>

          <InputWrapper label="name" error={errors.name?.message}>
            <Input {...register('name')} maxLength={250} />
          </InputWrapper>

          <Button type="submit" loading={adding}>
            add
          </Button>
        </SimpleGrid>
      </form>
    </Box>
  );
}
