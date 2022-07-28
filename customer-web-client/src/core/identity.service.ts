import { ApplicationUser } from '../models/identity';
import {
  UserProfileUpdateDto,
  UserRegistrationDto,
} from '../shared/dtos/identity';
import { BaseHttpClient } from './baseHttpClient';

export class IdentityService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  public getUserDetails(userId: string, accessToken: string) {
    return this._httpClient.callAuthenticatedAPI<ApplicationUser>(
      {
        method: 'GET',
        url: `users/${userId}`,
      },
      accessToken,
    );
  }

  public register(
    userRegistrationDto: Omit<UserRegistrationDto, 'confirmationPassword'>,
  ) {
    return this._httpClient.callAPI<ApplicationUser>({
      method: 'POST',
      url: 'users',
      data: userRegistrationDto,
    });
  }

  public update(id: string, dto: UserProfileUpdateDto) {
    return this._httpClient.callAPI<ApplicationUser>({
      method: 'PATCH',
      url: `users/${id}`,
      data: dto,
    });
  }
}
