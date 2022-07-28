import React from 'react';

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

import { Course } from '../../../../models/course';
import { getDateString, getTimeFromDate } from '../../../../utils';

type Props = {
  list: Course[];
  loading: boolean;

  openTutorDetailsForm: (tutorId: string) => () => void;
};

export function ApprovedCourseList({
  list,
  loading,
  openTutorDetailsForm,
}: Props) {
  return (
    <>
      <TableContainer
        bg="gray.50"
        shadow="0 0 12px rgba(0, 0, 0, 0.1)"
        borderRadius={12}
      >
        <Table>
          <TableCaption>
            {loading ? <Spinner /> : <Text>Courses</Text>}
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
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
