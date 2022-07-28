import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationContext } from '../../../contexts';
import { useGetAccessToken } from '../../../hooks';
import { DegreeCreationDto } from '../../../shared/dtos/tutor';
import { setTutorDegree, tutorDetailsSelector } from '../tutorSlice';

export function useAddDegree() {
  const { tutorsService } = useContext(ApplicationContext);
  const getAccessToken = useGetAccessToken();
  const dispatch = useDispatch();

  const { id: tutorId } = useSelector(tutorDetailsSelector);

  return useMutation(async (dto: DegreeCreationDto) => {
    const accessToken = await getAccessToken({});

    const degree = await tutorsService.addDegree(tutorId, dto, accessToken);

    dispatch(setTutorDegree(degree));
  });
}
