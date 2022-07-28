import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { QueryKey } from '../../../constants/shared';
import { ApplicationContext } from '../../../contexts';
import { RentalUpdateDto } from '../../../dtos/tutors';
import { environment } from '../../../environment';
import { useGetAccessToken } from '../../../hooks';
import { Tutor } from '../../../models/tutor';
import {
  PaginationMetadata,
  ResponseWithPagination,
} from '../../../shared/models';

export function useUpdateTutorRental(tutorId: string) {
  const { tutorsService } = useContext(ApplicationContext);

  const getAccessToken = useGetAccessToken();
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      amount,
      unit,
    }: RentalUpdateDto & PaginationMetadata & { isActive: boolean }) => {
      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        // TODO: get appropriate scope
      });

      return tutorsService.updateRental(tutorId, amount, unit, accessToken);
    },
    {
      onSuccess: (_, { amount, unit, currentPage, pageSize, isActive }) => {
        const queryKey = [
          isActive ? QueryKey.Tutors : QueryKey.InactiveTutors,
          currentPage,
          pageSize,
        ];

        const cachedResponse =
          queryClient.getQueryData<ResponseWithPagination<Tutor>>(queryKey);
        if (!cachedResponse) return;

        const { data: inactiveTutorList, pagination } = cachedResponse;

        const tutorIndex = inactiveTutorList.findIndex((t) => t.id === tutorId);
        if (tutorIndex === -1) return;

        const updatedTutor: Tutor = {
          ...inactiveTutorList[tutorIndex],
          rentalAmount: amount,
          rentalUnit: unit,
        };

        queryClient.invalidateQueries([QueryKey.TutorDetails, tutorId]);
        queryClient.setQueryData<ResponseWithPagination<Tutor>>(queryKey, {
          data: [
            ...inactiveTutorList.slice(0, tutorIndex),
            updatedTutor,
            ...inactiveTutorList.slice(tutorIndex + 1),
          ],
          pagination,
        });
      },
    }
  );
}
