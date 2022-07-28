import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import {
  Box,
  Button,
  Container,
  Pagination,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { useModals } from '@mantine/modals';

import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { useAppPagination } from '../../../../hooks';
import {
  CourseType,
  OneOnOneCourse,
  OnlineCourse,
} from '../../../../models/course';
import { TutorCourseCardView } from '../../components/TutorCourseCardView';
import { TutorCourseListFilteringPanel } from '../../components/TutorCourseListFilteringPanel';
import { TutorCourseRegistrationForm } from '../../components/TutorCourseRegistrationForm';
import { useApproveOneOnOneCourse } from '../../hooks/useApproveOneOnOneCourse';
import { tutorDetailsSelector } from '../../tutorSlice';
import styles from './TutorCourseListManagement.module.css';

export function TutorCourseListManagement() {
  const { coursesService } = useContext(ApplicationContext);

  const { id: tutorId } = useSelector(tutorDetailsSelector);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedCourseType, setSelectedCourseType] =
    useState<CourseType>('online');

  const [registrationFormOpened, setRegistrationFormOpened] = useState(false);

  const { openConfirmModal } = useModals();

  const {
    totalPage,
    pageNumber,
    pageSize,
    onPaginationMetaChange,
    onPageChange,
  } = useAppPagination();

  const { data: subjectList } = useQuery(
    ['tutors', tutorId, 'subjects'],
    () => coursesService.getSubjectListForTutor(tutorId),
    { enabled: !!tutorId, refetchOnWindowFocus: false },
  );

  const {
    data: courseListResponse,
    isLoading: fetchingCourseList,
    isError: hasFetchingCourseListError,
  } = useQuery(
    [
      'tutors',
      tutorId,
      'subjects',
      selectedSubjectId,
      'courses',
      selectedCourseType,
      pageNumber,
      pageSize,
    ],
    async () => {
      const response = await coursesService.getCourseListForTutor(
        selectedCourseType,
        tutorId,
        selectedSubjectId,
        { pageNumber, pageSize },
      );

      onPaginationMetaChange(response.pagination);
      return response;
    },
    { enabled: !!selectedSubjectId, refetchOnWindowFocus: false },
  );

  const { mutateAsync: approve } = useApproveOneOnOneCourse();

  const onApproveClick = (id: string) => {
    openConfirmModal({
      title: <Title order={2}>Confirmation</Title>,
      children: <Text>Do you really want to accept this course?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Back' },
      onConfirm: () =>
        approve({
          id,
          subjectId: selectedSubjectId,
          courseType: selectedCourseType,
          pageNumber,
          pageSize,
        }),
    });
  };

  return (
    <>
      <Container size="lg" className={styles.container}>
        <TutorCourseListFilteringPanel
          subjectList={subjectList ?? []}
          selectedCourseType={selectedCourseType}
          onSubjectIdChange={setSelectedSubjectId}
          onCourseTypeChange={setSelectedCourseType}
        />

        <Box className={styles.contentContainerWrapper}>
          {selectedCourseType === 'online' && (
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="gradient"
                gradient={{ from: 'grape', to: 'pink', deg: 35 }}
                onClick={() => setRegistrationFormOpened(true)}
              >
                Register new course
              </Button>
            </Box>
          )}

          <Box className={styles.contentContainer}>
            {selectedSubjectId ? (
              <Wrapper<OnlineCourse[] | OneOnOneCourse[]>
                type="page"
                data={courseListResponse?.data}
                loading={fetchingCourseList}
                hasError={hasFetchingCourseListError}
                withEmptyIndicator
              >
                <SimpleGrid cols={2} className={styles.listContainer}>
                  {courseListResponse?.data?.map((course) => (
                    <TutorCourseCardView
                      key={course.id}
                      course={course}
                      onApproveClick={onApproveClick}
                    />
                  ))}
                </SimpleGrid>
              </Wrapper>
            ) : (
              <Title style={{ fontWeight: 500 }}>
                Please select a specific subject
              </Title>
            )}
          </Box>

          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {totalPage >= 1 && (
              <Pagination
                total={totalPage}
                page={pageNumber}
                onChange={onPageChange}
              />
            )}
          </Box>
        </Box>
      </Container>

      <TutorCourseRegistrationForm
        selectedSubject={selectedSubjectId}
        subjectList={subjectList ?? []}
        opened={registrationFormOpened}
        pagedListRequest={{ pageNumber, pageSize }}
        onClose={() => setRegistrationFormOpened(false)}
      />
    </>
  );
}
