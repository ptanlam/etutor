export interface PaymentMethod {
  id: string;
  cardNumber: string;
  expiry: string;
  name: string;
  cvc: string;
  isPreferred: boolean;
  isActive: boolean;
}
