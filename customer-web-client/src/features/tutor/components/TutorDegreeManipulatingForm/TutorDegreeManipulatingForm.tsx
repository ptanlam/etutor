import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Grid,
  Image,
  Input,
  InputWrapper,
  Select,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { imageExtensions } from '../../../../constants/shared';
import { useImageUploading } from '../../../../hooks';
import { AcademicRank } from '../../../../models/constant';
import { Degree } from '../../../../models/tutor';
import { DegreeCreationDto } from '../../../../shared/dtos/tutor';
import { useAddDegree, useUpdateDegree } from '../../hooks';
import styles from './TutorDegreeManipulatingForm.module.css';

type Props = {
  onClose: () => void;
  academicRankList: AcademicRank[];
  degree?: Degree;
};

export function TutorDegreeManipulatingForm({
  academicRankList,
  onClose,
  degree,
}: Props) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<DegreeCreationDto>({
    defaultValues: {
      name: degree?.name,
      major: degree?.major,
      graduatedUniversity: degree?.graduatedUniversity,
      academicRankId: academicRankList.find(
        (a) => a.name === degree?.academicRank
      )?.id,
      dateOfIssue: degree?.dateOfIssue
        ? new Date(degree.dateOfIssue)
        : undefined,
    },
  });

  const { image, uploadImage } = useImageUploading();

  const isUpdatingMode = !!degree;

  const { mutateAsync: add, isLoading: adding } = useAddDegree();
  const { mutateAsync: update, isLoading: updating } = useUpdateDegree();

  const onSubmit = async (dto: DegreeCreationDto) => {
    if (isUpdatingMode && degree?.id) {
      await update({ id: degree!.id, dto });
    } else {
      await add(dto);
    }

    onClose();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <Grid gutter={20}>
        <Grid.Col span={4}>
          <InputWrapper
            label="image"
            description="please select image"
            error={errors.images?.message}
            required
            size="sm"
          >
            <Image src={image ?? degree?.image?.url} />
            <Input
              {...register('images')}
              type="file"
              accept={imageExtensions}
              onChange={uploadImage}
              multiple={false}
            />
          </InputWrapper>
        </Grid.Col>

        <Grid.Col span={8}>
          <InputWrapper
            label="name"
            description="please enter degree's name"
            error={errors.name?.message}
            required
          >
            <Input radius="md" {...register('name')} />
          </InputWrapper>

          <InputWrapper
            label="major"
            description="please enter degree's major"
            error={errors.major?.message}
            required
          >
            <Input radius="md" {...register('major')} />
          </InputWrapper>

          <InputWrapper
            label="university"
            description="please enter degree's university"
            error={errors.graduatedUniversity?.message}
            required
          >
            <Input radius="md" {...register('graduatedUniversity')} />
          </InputWrapper>

          <InputWrapper
            label="tutor's educational grade"
            description="please select tutor's educational grade"
            error={errors.academicRankId?.message}
          >
            <Controller
              name="academicRankId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  radius="md"
                  size="sm"
                  data={academicRankList.map(({ name, id }) => ({
                    label: name,
                    value: id,
                  }))}
                />
              )}
            />
          </InputWrapper>

          <InputWrapper
            label="date of issue"
            description="please select date of issue"
            error={errors.dateOfIssue?.message}
            required
          >
            <Controller
              name="dateOfIssue"
              control={control}
              render={({ field }) => <DatePicker radius="md" {...field} />}
            />
          </InputWrapper>
        </Grid.Col>
      </Grid>

      <Box className={styles.actionContainer}>
        <Button
          size="sm"
          color="red"
          disabled={adding || updating}
          onClick={onClose}
        >
          cancel
        </Button>

        <Button type="submit" size="sm" loading={adding || updating}>
          {isUpdatingMode ? 'update' : 'add'}
        </Button>
      </Box>
    </form>
  );
}
