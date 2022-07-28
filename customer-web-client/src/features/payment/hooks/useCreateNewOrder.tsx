import { useContext } from 'react';
import { useMutation } from 'react-query';

import { ApplicationContext } from '../../../contexts';
import { OrderCreationDto } from '../../../shared/dtos/payment';

export function useCreateNewOrder() {
  const { paymentsService } = useContext(ApplicationContext);

  return useMutation(async (dto: OrderCreationDto) => {
    // TODO: get access token
    const accessToken = '';

    const order = await paymentsService.createOrder(dto, accessToken);
    return order.id;
  });
}
