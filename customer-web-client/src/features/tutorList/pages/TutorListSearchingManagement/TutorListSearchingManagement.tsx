import qs from 'qs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Title } from '@mantine/core';

import { useAppDocumentTitle } from '../../../../hooks';
import { PagedListRequest } from '../../../../models/shared';
import { TutorListSearchingDto } from '../../../../shared/dtos/tutor';
import { TutorListSearchingForm } from '../../components/TutorListSearchingForm';

export function TutorListSearchingManagement() {
  useAppDocumentTitle('Tutors Searching');

  const navigate = useNavigate();

  const onSubmit = (dto: TutorListSearchingDto) => {
    const pagination: PagedListRequest = {
      pageNumber: 1,
      pageSize: 15,
    };

    navigate({
      pathname: '/tutors',
      search: qs.stringify({ ...dto, ...pagination }),
    });
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Title order={2} style={{ fontWeight: 900 }}>
        Tutor Searching
      </Title>
      <TutorListSearchingForm onSubmit={onSubmit} />
    </Box>
  );
}
