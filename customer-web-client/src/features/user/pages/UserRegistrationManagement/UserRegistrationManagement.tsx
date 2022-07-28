import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { useAppDocumentTitle } from '../../../../hooks';
import { Gender } from '../../../../models/constant';
import { UserRegistrationForm } from '../../components/UserRegistrationForm';

export function UserRegistrationManagement() {
  useAppDocumentTitle('User Registration');

  const { constantsService } = useContext(ApplicationContext);

  const {
    data: genderList,
    isLoading,
    isError,
  } = useQuery('genders', () => constantsService.getGenderList());

  return (
    <Wrapper<Gender[]> type="page" loading={isLoading} hasError={isError}>
      <UserRegistrationForm genderList={genderList!} />
    </Wrapper>
  );
}
