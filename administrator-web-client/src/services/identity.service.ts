import { ApplicationUser } from '../models/identity';
import { BaseHttpClient } from './baseHttpClient';

export class IdentityService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  public getUserDetails(userId: string, accessToken: string) {
    return this._httpClient.callAuthenticatedAPI<ApplicationUser>(
      {
        method: 'GET',
        url: `users/${userId}`,
      },
      accessToken
    );
  }
}
