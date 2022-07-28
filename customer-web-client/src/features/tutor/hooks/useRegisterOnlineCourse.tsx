import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

import { ApplicationContext } from '../../../contexts';
import { useGetAccessToken } from '../../../hooks';
import { OnlineCourseRegistrationDto } from '../../../shared/dtos/course';
import { ApplicationScope } from '../../../shared/enums';
import { tutorDetailsSelector } from '../tutorSlice';

export function useRegisterOnlineCourse(
  subjectId: string,
  pageNumber: number,
  pageSize: number
) {
  const { coursesService } = useContext(ApplicationContext);
  const queryClient = useQueryClient();
  const getAccessToken = useGetAccessToken();
  const { id: tutorId } = useSelector(tutorDetailsSelector);

  return useMutation(
    async (dto: Omit<OnlineCourseRegistrationDto, 'type'>) => {
      const accessToken = await getAccessToken({
        scope: ApplicationScope.CREATE_COURSES,
      });

      return coursesService.registerNewOnlineCourse(
        { ...dto, tutorId },
        accessToken
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          'tutors',
          tutorId,
          'subjects',
          subjectId,
          'courses',
          'online',
          pageNumber,
          pageSize,
        ]);
      },
    }
  );
}
