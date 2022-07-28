import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { useAppSelector } from '../../../app/hooks';
import { ApplicationContext } from '../../../contexts';
import { CourseType } from '../../../models/course';
import { tutorDetailsSelector } from '../tutorSlice';

export function useApproveOneOnOneCourse() {
  const { coursesService } = useContext(ApplicationContext);

  const { id: tutorId } = useAppSelector(tutorDetailsSelector);
  const queryClient = useQueryClient();

  return useMutation(
    ({
      id,
    }: {
      id: string;
      subjectId: string;
      courseType: CourseType;
      pageNumber: number;
      pageSize: number;
    }) => coursesService.approveOneOnOneCourse(id),
    {
      onSuccess: (_, { subjectId, courseType, pageNumber, pageSize }) =>
        queryClient.invalidateQueries([
          'tutors',
          tutorId,
          'subjects',
          subjectId,
          'courses',
          courseType,
          pageNumber,
          pageSize,
        ]),
    },
  );
}
