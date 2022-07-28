import { useContext } from 'react';

import { TutorRegistrationDto } from '../../../shared/dtos/tutor';
import { TutorRegistrationContext } from '../contexts';

export const useTutorRegistrationDto = () => {
  const { setDto } = useContext(TutorRegistrationContext);

  const setDescription = ({
    description,
  }: Pick<TutorRegistrationDto, 'description'>) => {
    console.log(
      '🚀 ~ file: useTutorRegistrationDto.tsx ~ line 12 ~ useTutorRegistrationDto ~ description',
      description,
    );
    setDto((prev) => ({ ...prev, description }));
  };

  const setSubjectList = ({
    subjects,
  }: Pick<TutorRegistrationDto, 'subjects'>) => {
    setDto((prev) => ({ ...prev, subjects }));
  };

  const setDegreeList = ({
    degrees,
  }: Pick<TutorRegistrationDto, 'degrees'>) => {
    setDto((prev) => ({ ...prev, degrees }));
  };

  const setCertificateList = ({
    certificates,
  }: Pick<TutorRegistrationDto, 'certificates'>) => {
    setDto((prev) => ({ ...prev, certificates }));
  };

  const setImageList = ({ images }: Pick<TutorRegistrationDto, 'images'>) => {
    setDto((prev) => ({ ...prev, images }));
  };

  return {
    setDescription,
    setSubjectList,
    setDegreeList,
    setCertificateList,
    setImageList,
  };
};
