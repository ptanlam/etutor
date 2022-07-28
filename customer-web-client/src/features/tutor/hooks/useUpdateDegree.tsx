import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationContext } from '../../../contexts';
import { useGetAccessToken } from '../../../hooks';
import { DegreeCreationDto } from '../../../shared/dtos/tutor';
import { setTutorDegree, tutorDetailsSelector } from '../tutorSlice';

export function useUpdateDegree() {
  const { tutorsService } = useContext(ApplicationContext);
  const { id: tutorId } = useSelector(tutorDetailsSelector);
  const getAccessToken = useGetAccessToken();

  const dispatch = useDispatch();

  return useMutation(
    async ({ id, dto }: { id: number; dto: Partial<DegreeCreationDto> }) => {
      const accessToken = await getAccessToken({
        // TODO: get appropriate scope
      });

      const updatedDegree = await tutorsService.updateDegree(
        id,
        tutorId,
        dto,
        accessToken
      );

      dispatch(setTutorDegree(updatedDegree));
    }
  );
}
