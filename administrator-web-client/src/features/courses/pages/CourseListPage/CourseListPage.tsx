import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';

import { Pagination } from '../../../../components/Pagination';
import { Wrapper } from '../../../../components/Wrapper';
import { QueryKey } from '../../../../constants/shared';
import { ApplicationContext } from '../../../../contexts';
import { CourseType } from '../../../../enums/course';
import { environment } from '../../../../environment';
import { useGetAccessToken, usePagination } from '../../../../hooks';
import { ApplicationScope } from '../../../../shared/enums';
import { TutorDetails } from '../../../tutors/components/TutorDetails';
import { ApprovedCourseList } from '../../components/ApprovedCourseList';
import { PendingCourseRegistrationList } from '../../components/PendingCourseRegistrationList';
import { useSetCourseActiveStatus } from '../../hooks';

type Props = { isActive: boolean };

export function CourseListPage({ isActive }: Props) {
  const { coursesService, tutorsService } = useContext(ApplicationContext);

  const getAccessToken = useGetAccessToken();

  const { pagination, setCurrentPage, setTotalCount, setTotalPage } =
    usePagination(10, 1);
  const { currentPage, pageSize } = pagination;

  const [courseType, setCourseType] = useState(CourseType.Online);
  const [tutorDetailsModal, setTutorDetailsModal] = useState({
    opened: false,
    tutorId: '',
  });

  const { data: response, isLoading } = useQuery(
    [
      isActive ? QueryKey.Courses : QueryKey.InactiveCourses,
      courseType,
      currentPage,
      pageSize,
    ],
    async ({ signal }) => {
      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        scope: ApplicationScope.READ_INACTIVE_COURSES,
      });

      const response = await coursesService.getPagedList(
        courseType,
        isActive,
        accessToken,
        signal
      );

      setTotalPage(response.pagination.totalPage);
      setTotalCount(response.pagination.totalCount);

      return response;
    }
  );

  const {
    data: tutorDetails,
    isLoading: fetchingDetails,
    isError: fetchingDetailsError,
  } = useQuery(
    [QueryKey.TutorDetails, tutorDetailsModal.tutorId],
    ({ signal }) =>
      tutorsService.getTutorDetails(tutorDetailsModal.tutorId, signal),
    {
      enabled: tutorDetailsModal.opened && !!tutorDetailsModal.tutorId,
    }
  );

  const { mutateAsync: approve, isLoading: approving } =
    useSetCourseActiveStatus({ ...pagination, courseType });

  const onTutorDetailsModalOpen = (tutorId: string) => {
    return () =>
      setTutorDetailsModal((prev) => ({ ...prev, opened: true, tutorId }));
  };

  const onTutorDetailsModalClose = () => {
    setTutorDetailsModal((prev) => ({ ...prev, opened: false, tutorId: '' }));
  };

  return (
    <>
      <Box
        height="100%"
        display="flex"
        flexDir="column"
        gap={8}
        justifyContent="space-between"
      >
        <Box display="flex" flexDir="column" gap={4}>
          <RadioGroup
            defaultValue={courseType}
            onChange={(value: CourseType) => setCourseType(value)}
          >
            <Stack spacing={4} direction="row">
              <Radio value={CourseType.Online}>Online</Radio>
              <Radio value={CourseType.OneOnOne}>One On One</Radio>
            </Stack>
          </RadioGroup>

          {isActive ? (
            <ApprovedCourseList
              list={response?.data || []}
              loading={isLoading}
              openTutorDetailsForm={onTutorDetailsModalOpen}
            />
          ) : (
            <PendingCourseRegistrationList
              list={response?.data || []}
              loading={isLoading}
              openTutorDetailsForm={onTutorDetailsModalOpen}
              onApprove={approve}
              approving={approving}
            />
          )}
        </Box>

        <Pagination
          onPageChange={setCurrentPage}
          pageCount={pagination.totalPage}
        />
      </Box>

      <Modal
        isOpen={tutorDetailsModal.opened}
        onClose={onTutorDetailsModalClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Details</ModalHeader>
          <ModalBody>
            <Wrapper
              data={tutorDetails}
              type="section"
              loading={fetchingDetails}
              hasError={fetchingDetailsError}
            >
              <TutorDetails details={tutorDetails!} />
            </Wrapper>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={onTutorDetailsModalClose}
            >
              Back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
