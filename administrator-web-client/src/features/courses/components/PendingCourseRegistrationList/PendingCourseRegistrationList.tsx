import React, { useState } from 'react';
import { UseMutateAsyncFunction } from 'react-query';

import {
  Badge,
  Button,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { ConfirmModal } from '../../../../components/ConfirmModal';
import { Course } from '../../../../models/course';
import { getDateString, getTimeFromDate } from '../../../../utils';

type Props = {
  list: Course[];
  loading: boolean;
  approving: boolean;

  openTutorDetailsForm: (tutorId: string) => () => void;
  onApprove: UseMutateAsyncFunction<
    unknown,
    unknown,
    {
      courseId: string;
      isActive: boolean;
    },
    unknown
  >;
};

export function PendingCourseRegistrationList({
  list,
  loading,
  approving,
  openTutorDetailsForm,
  onApprove,
}: Props) {
  const [confirmModal, setConfirmModal] = useState({
    opened: false,
    courseId: '',
  });

  const onConfirmModalOpen = (courseId: string) => {
    return () =>
      setConfirmModal((prev) => ({ ...prev, opened: true, courseId }));
  };

  const onConfirmModalClose = () => {
    return setConfirmModal((prev) => ({
      ...prev,
      opened: false,
      courseId: '',
    }));
  };

  const onApproveClick = async () => {
    await onApprove({ courseId: confirmModal.courseId, isActive: true });
    onConfirmModalClose();
  };

  return (
    <>
      <TableContainer
        bg="gray.50"
        shadow="0 0 12px rgba(0, 0, 0, 0.1)"
        borderRadius={12}
      >
        <Table>
          <TableCaption>
            {loading ? <Spinner /> : <Text>Pending course registrations</Text>}
          </TableCaption>

          <Thead>
            <Tr>
              <Th>Subject</Th>
              <Th>Educational level</Th>
              <Th>Educational grade</Th>
              <Th>Learning days</Th>
              <Th>Duration date</Th>
              <Th>Duration time</Th>
              <Th>Tutor</Th>
              <Th>Tuition</Th>
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody>
            {list.map((course) => {
              const {
                id,
                subjectName,
                educationalLevel,
                educationalGrade,
                learningDays,
                tuitionFeeAmount,
                tuitionFeeUnit,
                tutor,
              } = course;

              const startDate = new Date(course.startDate);
              const endDate = new Date(course.endDate);

              return (
                <Tr key={id}>
                  <Td>{subjectName}</Td>
                  <Td>{educationalLevel}</Td>
                  <Td>{educationalGrade}</Td>
                  <Td display="flex" gap={2}>
                    {React.Children.toArray(
                      learningDays
                        .split(',')
                        .map((day) => <Badge colorScheme="yellow">{day}</Badge>)
                    )}
                  </Td>
                  <Td>
                    {getDateString(course.startDate)} &#8594;{' '}
                    {getDateString(course.endDate)}
                  </Td>
                  <Td>
                    {getTimeFromDate(startDate)} &#8594;{' '}
                    {getTimeFromDate(endDate)}
                  </Td>
                  <Td>
                    <Button
                      size="xs"
                      colorScheme="messenger"
                      onClick={openTutorDetailsForm(tutor.id)}
                    >
                      Details
                    </Button>
                  </Td>
                  <Td>{`${tuitionFeeAmount.toLocaleString()} ${tuitionFeeUnit.toUpperCase()}`}</Td>
                  <Td>
                    <Button
                      size="xs"
                      colorScheme="green"
                      onClick={onConfirmModalOpen(id)}
                    >
                      Approve
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <ConfirmModal
        opened={confirmModal.opened}
        onClose={onConfirmModalClose}
        warningText="You're about to approve this course registration. Are you sure?"
        onYes={onApproveClick}
        isLoading={approving}
      />
    </>
  );
}
