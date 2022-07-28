import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Grid,
  Image,
  Input,
  InputWrapper,
  SimpleGrid,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { imageExtensions } from '../../../../constants/shared';
import { useImageUploading } from '../../../../hooks';
import { Certificate } from '../../../../models/tutor';
import { CertificateCreationDto } from '../../../../shared/dtos/tutor/certificateCreationDto';
import { useAddCertificate, useUpdateCertificate } from '../../hooks';
import styles from './TutorCertificateManipulatingForm.module.css';

type Props = {
  onClose: () => void;
  certificate?: Certificate;
};

export function TutorCertificateManipulatingForm({
  certificate,
  onClose,
}: Props) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateCreationDto>({
    defaultValues: {
      name: certificate?.name,
      placeOfIssue: certificate?.placeOfIssue,
      dateOfIssue: certificate?.dateOfIssue
        ? new Date(certificate?.dateOfIssue)
        : undefined,
      expiresIn: certificate?.expiresIn
        ? new Date(certificate?.expiresIn)
        : undefined,
    },
  });

  const { image, uploadImage } = useImageUploading();

  const isUpdatingMode = !!certificate;

  const dateOfIssue = watch('dateOfIssue');

  const { mutateAsync: add, isLoading: adding } = useAddCertificate();
  const { mutateAsync: update, isLoading: updating } = useUpdateCertificate();

  const onSubmit = async (dto: CertificateCreationDto) => {
    if (isUpdatingMode && certificate?.id) {
      await update({ id: certificate.id, dto });
    } else {
      await add(dto);
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid.Col span={4}>
          <InputWrapper
            label="image"
            description="please select image"
            error={errors.images?.message}
            required
            size="sm"
          >
            <Image src={image ?? certificate?.image?.url} />
            <Input
              {...register('images')}
              type="file"
              accept={imageExtensions}
              onChange={uploadImage}
              multiple={false}
            />
          </InputWrapper>
        </Grid.Col>

        <Grid.Col span={8} className={styles.container}>
          <InputWrapper
            label="name"
            description="please enter certificate's name"
            error={errors.name?.message}
            required
          >
            <Input radius="md" {...register('name')} />
          </InputWrapper>

          <InputWrapper
            label="place of issue"
            description="please enter certificate's place of issue"
            error={errors.placeOfIssue?.message}
            required
          >
            <Input radius="md" {...register('placeOfIssue')} />
          </InputWrapper>

          <SimpleGrid cols={2}>
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
            <InputWrapper
              label="expire date"
              description="please select expire date"
              error={errors.dateOfIssue?.message}
              required
            >
              <Controller
                name="expiresIn"
                control={control}
                render={({ field }) => (
                  <DatePicker radius="md" {...field} minDate={dateOfIssue} />
                )}
              />
            </InputWrapper>
          </SimpleGrid>

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
        </Grid.Col>
      </Grid>
    </form>
  );
}
