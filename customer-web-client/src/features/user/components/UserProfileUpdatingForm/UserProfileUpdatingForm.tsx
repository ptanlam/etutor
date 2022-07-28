import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, InputWrapper, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { useAppSelector } from '../../../../app/hooks';
import { Gender } from '../../../../models/constant';
import { UserProfileUpdateDto } from '../../../../shared/dtos/identity';
import { userUpdateSchema } from '../../../../shared/schemas';
import { useUpdateUserProfile } from '../../hooks';
import { userDetailsSelector } from '../../userSlice';
import styles from './UserProfileUpdatingForm.module.css';

type Props = { genders: Gender[]; onClose: () => void };

export function UserProfileUpdatingForm({ genders, onClose }: Props) {
  const { firstName, lastName, fullName, dateOfBirth, gender } =
    useAppSelector(userDetailsSelector);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileUpdateDto>({
    defaultValues: {
      firstName,
      lastName,
      middleName: fullName.slice(
        fullName.indexOf(' ') + 1,
        fullName.lastIndexOf(' '),
      ),
      dateOfBirth: new Date(dateOfBirth),
      genderId: genders.find((g) => g.name === gender)?.id,
    },
    resolver: yupResolver(userUpdateSchema),
  });

  const { mutateAsync: update, isLoading } = useUpdateUserProfile();

  const onSubmit = async (dto: UserProfileUpdateDto) => {
    await update(dto);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <InputWrapper
        label="First name"
        error={errors?.firstName?.message}
        required
      >
        <Input {...register('firstName')} />
      </InputWrapper>

      <InputWrapper label="Middle name" error={errors?.firstName?.message}>
        <Input {...register('middleName')} />
      </InputWrapper>

      <InputWrapper
        label="Last name"
        error={errors?.firstName?.message}
        required
      >
        <Input {...register('lastName')} />
      </InputWrapper>

      <InputWrapper
        label="Date of birth"
        error={errors.dateOfBirth?.message}
        required
      >
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field: { ...rest } }) => (
            <DatePicker maxDate={new Date()} {...rest} />
          )}
        />
      </InputWrapper>

      <InputWrapper label="Gender" error={errors.genderId?.message} required>
        <Controller
          name="genderId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              data={genders.map(({ name, id }) => ({
                label: name,
                value: id,
              }))}
            />
          )}
        />
      </InputWrapper>

      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" loading={isLoading}>
          Update
        </Button>
      </Box>
    </form>
  );
}
