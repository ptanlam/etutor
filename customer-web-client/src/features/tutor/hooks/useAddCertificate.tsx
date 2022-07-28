import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationContext } from '../../../contexts';
import { useGetAccessToken } from '../../../hooks';
import { CertificateCreationDto } from '../../../shared/dtos/tutor/certificateCreationDto';
import { setTutorCertificate, tutorDetailsSelector } from '../tutorSlice';

export function useAddCertificate() {
  const { tutorsService } = useContext(ApplicationContext);
  const getAccessToken = useGetAccessToken();
  const dispatch = useDispatch();

  const { id: tutorId } = useSelector(tutorDetailsSelector);

  return useMutation(async (dto: CertificateCreationDto) => {
    const accessToken = await getAccessToken({
      // TODO: get appropriate access token
    });

    const certificate = await tutorsService.addCertificate(
      tutorId,
      dto,
      accessToken
    );

    dispatch(setTutorCertificate(certificate));
  });
}
