import { PaymentMethod } from '../../../models/payment';

export interface PaymentMethodCreationDto
  extends Pick<PaymentMethod, 'cardNumber' | 'expiry' | 'name' | 'cvc'> {}
