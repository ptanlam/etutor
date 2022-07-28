import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as yup from 'yup';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Select,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { QueryKey } from '../../../../constants/shared';
import { ApplicationContext } from '../../../../contexts';
import { EducationalGradeCreationDto } from '../../../../dtos/constants';
import { Constant } from '../../../../models/constant';
import { useAddEducationalGrade, useUpdateEducationalGrade } from '../../hooks';

type Props = {
  chosenEducationalLevelId: string;
  grade?: Constant;
  closeForm: () => void;
};

const schema = yup.object({
  name: yup.string().max(250).min(3).required(),
  educationalLevelId: yup.string().required(),
});

export function EducationalGradeManipulatingForm({
  chosenEducationalLevelId,
  grade,
  closeForm,
}: Props) {
  const { constantsService } = useContext(ApplicationContext);

  const isUpdatingMode = !!grade;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EducationalGradeCreationDto>({
    resolver: yupResolver(schema),
    defaultValues: { name: grade?.name },
  });

  const { data: educationalLevelList } = useQuery(
    QueryKey.EducationalLevels,
    () => constantsService.getConstantList('educational-levels')
  );

  const { mutateAsync: add, isLoading: adding } = useAddEducationalGrade();
  const { mutateAsync: update, isLoading: updating } =
    useUpdateEducationalGrade();

  const onSubmit = async (dto: EducationalGradeCreationDto) => {
    if (isUpdatingMode && !!grade?.id) {
      await update({ id: grade.id, dto });
    } else {
      await add(dto);
    }

    closeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody display="flex" flexDir="column" gap={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" type="text" {...register('name')} />
          {errors.name ? (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          ) : (
            <FormHelperText>
              Enter name of the educational grade.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.educationalLevelId}>
          <FormLabel htmlFor="educationalLevelId">Educational level</FormLabel>
          <Controller
            control={control}
            name="educationalLevelId"
            defaultValue={chosenEducationalLevelId}
            render={({ field }) => (
              <Select {...field} placeholder="Select educational level">
                {educationalLevelList?.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.educationalLevelId ? (
            <FormErrorMessage>
              {errors.educationalLevelId.message}
            </FormErrorMessage>
          ) : (
            <FormHelperText>Please select an educational level.</FormHelperText>
          )}
        </FormControl>
      </ModalBody>

      <ModalFooter gap={2}>
        <Button size="sm">Cancel</Button>

        <Button
          size="sm"
          colorScheme="blue"
          type="submit"
          isLoading={adding || updating}
        >
          {isUpdatingMode ? 'Update' : 'Add'}
        </Button>
      </ModalFooter>
    </form>
  );
}
