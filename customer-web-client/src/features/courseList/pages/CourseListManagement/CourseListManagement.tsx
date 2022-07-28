import { useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Container, Pagination, SimpleGrid, Title } from '@mantine/core';

import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { useAppPagination } from '../../../../hooks';
import { OnlineCourse } from '../../../../models/course';
import { PagedListRequestFromQuery } from '../../../../models/shared';
import { CourseListSearchingDto } from '../../../../shared/dtos/course';
import { EnrollmentCreationDto } from '../../../../shared/dtos/enrollment';
import { parseSearchParams, tryParseInt } from '../../../../utils';
import { userDetailsSelector } from '../../../user/userSlice';
import { CourseCardView } from '../../components/CourseCardView';
import styles from './CourseListManagement.module.css';

export function CourseListManagement() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { coursesService } = useContext(ApplicationContext);

  const { id: studentId } = useSelector(userDetailsSelector);

  const conditions = useMemo(
    () =>
      parseSearchParams<CourseListSearchingDto & PagedListRequestFromQuery>(
        params,
      ),
    [params],
  );

  const { pageSize, ...rest } = conditions;

  const { totalPage, pageNumber, onPaginationMetaChange, onPageChange } =
    useAppPagination(tryParseInt(conditions.pageNumber), tryParseInt(pageSize));

  const {
    data: response,
    isFetching,
    isError,
  } = useQuery(
    ['courses', params.toString(), pageNumber, pageSize],
    async () => {
      const response = await coursesService.getOnlineCourseListByConditions(
        rest,
        'online',
        {
          pageNumber,
          pageSize: tryParseInt(pageSize),
        },
      );

      onPaginationMetaChange(response.pagination);
      return response;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: !!Object.keys(conditions).length,
    },
  );

  const onEnroll = (course: OnlineCourse) => {
    const {
      startDate,
      endDate,
      startAt,
      endAt,
      learningDays,
      tutor,
      tuitionFeeAmount,
      tuitionFeeUnit,
      id,
    } = course;

    const enrollmentCreationDto: EnrollmentCreationDto = {
      courseId: id,
      studentId,
      tutorId: tutor.id,

      startDate: new Date(startDate),
      endDate: new Date(endDate),
      startAt,
      endAt,

      learningDays: learningDays?.split(','),
      tuitionAmount: tuitionFeeAmount,
      tuitionUnit: tuitionFeeUnit,
    };

    navigate('/payment/checkout', { state: enrollmentCreationDto });
  };

  const hasData = !isFetching && !!response?.data && !!response.data.length;

  return (
    <Container size="xl" className={styles.wrapper}>
      <Box className={styles.container}>
        {!isFetching && (
          <Title order={3}>{response?.pagination.totalCount} course(s)</Title>
        )}

        <Box className={styles.listContainer}>
          <Wrapper<OnlineCourse[]>
            type="page"
            data={response?.data}
            loading={isFetching}
            hasError={isError}
          >
            <Box style={{ flex: 1 }}>
              <SimpleGrid cols={3} spacing={16}>
                {(response?.data || []).map((course) => (
                  <CourseCardView
                    key={course.id}
                    course={course}
                    onEnroll={onEnroll}
                  />
                ))}
              </SimpleGrid>
            </Box>
          </Wrapper>
        </Box>

        {hasData && (
          <Pagination
            total={totalPage}
            page={pageNumber}
            onChange={onPageChange}
          />
        )}
      </Box>
    </Container>
  );
}
