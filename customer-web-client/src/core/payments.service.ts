import { Order, PaymentMethod, Transaction } from '../models/payment';
import { PagedListRequest, PaginationMetadata } from '../models/shared';
import {
  OrderCreationDto,
  PaymentMethodCreationDto,
} from '../shared/dtos/payment';
import { BaseHttpClient } from './baseHttpClient';

export class PaymentsService {
  constructor(private readonly _client: BaseHttpClient) {}

  public getPaymentMethodsForUser(
    userId: string,
    pagedListRequest: PagedListRequest,
    accessToken: string,
  ): Promise<{
    data: PaymentMethod[];
    pagination: PaginationMetadata;
  }> {
    return this._client.callAuthenticatedAPIWithPagination<PaymentMethod[]>(
      {
        url: 'methods',
        params: { userId, ...pagedListRequest },
        method: 'GET',
      },
      accessToken,
    );
  }

  public getTransactionsForOwner(
    ownerId: string,
    pagedListRequest: PagedListRequest,
    signal?: AbortSignal,
  ) {
    return this._client.callAPIWithPagination<Transaction[]>({
      url: 'transactions',
      method: 'GET',
      params: { ownerId, ...pagedListRequest },
      signal,
    });
  }

  public addNewPaymentMethod(
    userId: string,
    dto: PaymentMethodCreationDto,
    accessToken: string,
  ): Promise<PaymentMethod> {
    return this._client.callAuthenticatedAPI<PaymentMethod>(
      {
        url: 'payment-methods',
        method: 'POST',
        params: { userId },
        data: dto,
      },
      accessToken,
    );
  }

  public createOrder(dto: OrderCreationDto, accessToken: string) {
    return this._client.callAuthenticatedAPI<Order>(
      {
        url: 'orders',
        method: 'POST',
        data: dto,
      },
      accessToken,
    );
  }

  public captureOrder(id: string, accessToken: string) {
    return this._client.callAuthenticatedAPI(
      {
        url: `orders/${id}/capture`,
        method: 'POST',
      },
      accessToken,
    );
  }

  public async getHostedFieldAuth() {
    const { client_token, expires_in, id_token } = await this._client.callAPI<{
      client_token: string;
      id_token: string;
      expires_in: number;
    }>({
      baseURL:
        'https://braintree-sdk-demo.herokuapp.com/api/paypal/hosted-fields/auth',
    });

    return {
      clientToken: client_token,
      idToken: id_token,
      expiresIn: expires_in,
    };
  }
}
