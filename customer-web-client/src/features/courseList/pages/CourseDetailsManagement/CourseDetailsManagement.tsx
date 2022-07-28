import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { Container } from '@mantine/core';

import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { CourseDetails as CourseDetailsModel } from '../../../../models/course';
import { NotFoundPage } from '../../../../pages/NotFoundPage';
import { CourseDetails } from '../../components/CourseDetails';

export function CourseDetailsManagement() {
  const { id } = useParams<{ id: string }>();
  const { coursesService } = useContext(ApplicationContext);

  const { data, isLoading, isError } = useQuery(
    ['courses', id],
    () => coursesService.getCourseDetails(id!),
    { refetchOnWindowFocus: false, enabled: !!id }
  );

  if (!isLoading && !data) return <NotFoundPage />;

  return (
    <Container size="lg" style={{ display: 'flex', flex: 1 }}>
      <Wrapper<CourseDetailsModel>
        type="page"
        data={data}
        loading={isLoading}
        hasError={isError}
      >
        <CourseDetails details={data!} />
      </Wrapper>
    </Container>
  );
}
