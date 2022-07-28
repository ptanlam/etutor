import Cards from 'react-credit-cards';

import { Box } from '@mantine/core';

import { PaymentMethod } from '../../../../models/payment';

type Props = { paymentMethod: PaymentMethod };

export function PaymentMethodCardView({ paymentMethod }: Props) {
  const { cardNumber, expiry, name, cvc, isActive } = paymentMethod;

  return (
    <Box style={{ filter: `grayscale(${isActive ? 0 : 1})` }}>
      <Cards expiry={expiry} name={name} number={cardNumber} cvc={cvc} />
    </Box>
  );
}
