import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import { ApplicationContext } from '../../../contexts';
import { PaymentMethodCreationDto } from '../../../shared/dtos/payment';
import { userDetailsSelector } from '../../user/userSlice';

export function useAddNewPaymentMethod() {
  const { paymentsService } = useContext(ApplicationContext);
  const { id: userId } = useSelector(userDetailsSelector);

  return useMutation(async (dto: PaymentMethodCreationDto) => {
    // TODO: get access token
    const accessToken = '';
    return paymentsService.addNewPaymentMethod(userId, dto, accessToken);
  });
}
