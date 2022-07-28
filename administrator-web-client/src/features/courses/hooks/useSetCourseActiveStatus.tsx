import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { QueryKey } from '../../../constants/shared';
import { ApplicationContext } from '../../../contexts';
import { CourseType } from '../../../enums/course';
import { environment } from '../../../environment';
import { useGetAccessToken } from '../../../hooks';
import { ApplicationScope } from '../../../shared/enums';
import { PaginationMetadata } from '../../../shared/models';

export function useSetCourseActiveStatus({
  currentPage,
  pageSize,
  courseType,
}: PaginationMetadata & { courseType: CourseType }) {
  const { coursesService } = useContext(ApplicationContext);

  const queryClient = useQueryClient();
  const getAccessToken = useGetAccessToken();

  return useMutation(
    async ({ courseId, isActive }: { courseId: string; isActive: boolean }) => {
      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        scope: ApplicationScope.ACTIVATE_COURSES,
      });

      return coursesService.setCourseActiveStatus(
        courseId,
        isActive,
        accessToken
      );
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries([
          QueryKey.InactiveCourses,
          courseType,
          currentPage,
          pageSize,
        ]),
    }
  );
}
