import qs from 'qs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Title } from '@mantine/core';

import { useAppDocumentTitle } from '../../../../hooks';
import { PagedListRequest } from '../../../../models/shared';
import { CourseListSearchingDto } from '../../../../shared/dtos/course';
import { CourseListSearchingForm } from '../../components/CourseListSearchingForm';

export function CourseListSearchingManagement() {
  useAppDocumentTitle('Courses Finding');

  const navigate = useNavigate();

  const onSubmit = (dto: CourseListSearchingDto) => {
    const pagination: PagedListRequest = {
      pageNumber: 1,
      pageSize: 10,
    };

    navigate({
      pathname: '/courses',
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
        Course Searching
      </Title>
      <CourseListSearchingForm onSubmit={onSubmit} />
    </Box>
  );
}
