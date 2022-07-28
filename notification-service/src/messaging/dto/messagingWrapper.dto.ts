/**
 * * This wrapper is specifically for messages
 * * sended from Masstransit
 */
export interface MessagingWrapper<T> {
  message: T;
}
