import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationContext } from '../../../contexts';
import { useGetAccessToken } from '../../../hooks';
import { CertificateCreationDto } from '../../../shared/dtos/tutor/certificateCreationDto';
import { setTutorCertificate, tutorDetailsSelector } from '../tutorSlice';

export function useUpdateCertificate() {
  const { tutorsService } = useContext(ApplicationContext);
  const { id: tutorId } = useSelector(tutorDetailsSelector);
  const getAccessToken = useGetAccessToken();
  const dispatch = useDispatch();

  return useMutation(
    async ({
      id,
      dto,
    }: {
      id: number;
      dto: Partial<CertificateCreationDto>;
    }) => {
      const accessToken = await getAccessToken({
        // TODO: get appropriate scope
      });

      const updatedCertificate = await tutorsService.updateCertificate(
        id,
        tutorId,
        dto,
        accessToken
      );

      dispatch(setTutorCertificate(updatedCertificate));
    }
  );
}
