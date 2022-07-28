import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { Modal, Title } from '@mantine/core';

import { useAppSelector } from '../../../../app/hooks';
import { ApplicationContext } from '../../../../contexts';
import { useAppDocumentTitle } from '../../../../hooks';
import { UserProfile } from '../../components/UserProfile';
import { UserProfileUpdatingForm } from '../../components/UserProfileUpdatingForm';
import { userDetailsSelector } from '../../userSlice';

export function UserProfileManagement() {
  const { firstName, lastName } = useAppSelector(userDetailsSelector);
  useAppDocumentTitle(`${firstName} ${lastName}`);

  const { constantsService } = useContext(ApplicationContext);

  const [updateFormOpened, setUpdateFormOpened] = useState(false);

  const { data: genders } = useQuery('genders', () =>
    constantsService.getGenderList()
  );

  const toggleUpdateForm = () => setUpdateFormOpened((prev) => !prev);

  return (
    <>
      <UserProfile openUpdateForm={toggleUpdateForm} />

      <Modal
        opened={updateFormOpened}
        onClose={toggleUpdateForm}
        radius="xl"
        centered
        title={
          <Title
            order={4}
            style={{ fontWeight: 900 }}
          >{`${firstName} ${lastName}`}</Title>
        }
      >
        <UserProfileUpdatingForm
          genders={genders || []}
          onClose={toggleUpdateForm}
        />
      </Modal>
    </>
  );
}
