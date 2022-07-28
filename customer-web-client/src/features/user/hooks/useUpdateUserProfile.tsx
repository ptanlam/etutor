import { useContext } from 'react';
import { useMutation } from 'react-query';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ApplicationContext } from '../../../contexts';
import { UserProfileUpdateDto } from '../../../shared/dtos/identity';
import { setUserDetails, userDetailsSelector } from '../userSlice';

export function useUpdateUserProfile() {
  const { identityService } = useContext(ApplicationContext);
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(userDetailsSelector);

  return useMutation(
    (dto: UserProfileUpdateDto) => {
      // TODO: get access token
      return identityService.update(id, dto);
    },
    {
      onSuccess: (user) => {
        dispatch(setUserDetails(JSON.stringify(user)));
      },
    },
  );
}
