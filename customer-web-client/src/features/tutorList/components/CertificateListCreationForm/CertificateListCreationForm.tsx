import { motion } from 'framer-motion';
import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  ActionIcon,
  Box,
  Image,
  Input,
  InputWrapper,
  SimpleGrid,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import {
  imageExtensions,
  placeholderImage,
} from '../../../../constants/shared';
import { useImageUploading } from '../../../../hooks';
import { TutorRegistrationDto } from '../../../../shared/dtos/tutor';
import { StepType } from '../../../../shared/enums';
import { VisibilityProps } from '../../../../shared/props';
import { useTutorRegistrationDto } from '../../hooks';
import styles from './CertificateListCreationForm.module.css';

type Props = VisibilityProps & { onStepChange: (stepType: StepType) => void };

const schema = yup.object({
  certificates: yup.array().of(
    yup.object({
      name: yup.string().max(250).required(),
      placeOfIssue: yup.string().max(250).required(),
      dateOfIssue: yup.date().required(),
      expiresIn: yup.date().required(),
    })
  ),
});

export function CertificateListCreationForm({
  isVisible,
  onStepChange,
}: Props) {
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<Pick<TutorRegistrationDto, 'certificates'>>({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certificates',
  });

  const { setCertificateList } = useTutorRegistrationDto();

  return (
    <>
      {isVisible && (
        <motion.form
          className={styles.container}
          onSubmit={handleSubmit(setCertificateList)}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 12,
            }}
          >
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ActionIcon radius="xl">
                <IoIosArrowDropleftCircle
                  fontSize="1.5rem"
                  onClick={() => onStepChange(StepType.Backward)}
                />
              </ActionIcon>

              <Title order={3}>Add certificates (optional)</Title>

              <ActionIcon
                type="submit"
                radius="xl"
                onClick={() => onStepChange(StepType.Forward)}
              >
                <IoIosArrowDroprightCircle fontSize="1.5rem" />
              </ActionIcon>
            </Box>

            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <ActionIcon
                variant="hover"
                onClick={() => append({})}
                radius="xl"
                color="blue"
              >
                <AiOutlinePlusCircle fontSize="1.4rem" />
              </ActionIcon>
            </Box>
          </Box>

          <SimpleGrid cols={1}>
            {React.Children.toArray(
              fields.map((_, index) => (
                <CertificateCreationForm
                  index={index}
                  register={register}
                  control={control}
                  watch={watch}
                  remove={remove}
                  errors={errors}
                />
              ))
            )}
          </SimpleGrid>
        </motion.form>
      )}
    </>
  );
}

type CertificateCreationFormProps = {
  index: number;
  register: UseFormRegister<Pick<TutorRegistrationDto, 'certificates'>>;
  control: Control<Pick<TutorRegistrationDto, 'certificates'>, any>;
  watch: UseFormWatch<Pick<TutorRegistrationDto, 'certificates'>>;
  remove: UseFieldArrayRemove;
  errors: {
    certificates?:
      | {
          name?: FieldError | undefined;
          placeOfIssue?: FieldError | undefined;
          dateOfIssue?: FieldError | undefined;
          expiresIn?: FieldError | undefined;
        }[]
      | undefined;
  };
};

function CertificateCreationForm({
  index,
  register,
  control,
  watch,
  remove,
  errors,
}: CertificateCreationFormProps) {
  const { image, uploadImage } = useImageUploading();

  const dateOfIssue: Date = watch(`certificates.${index}.dateOfIssue` as any);

  return (
    <Box className={styles.certificateContainer}>
      <Box className={styles.closeBtn}>
        <ActionIcon
          variant="filled"
          radius="xl"
          color="red"
          onClick={() => remove(index)}
        >
          <AiOutlineClose />
        </ActionIcon>
      </Box>

      <SimpleGrid cols={1} className={styles.certificateImg}>
        <Image
          src={typeof image === 'string' ? image : placeholderImage}
          radius="lg"
        />
        <Input
          type="file"
          accept={imageExtensions}
          {...register(`certificates.${index}.images`)}
          onChange={uploadImage}
        />
      </SimpleGrid>

      <SimpleGrid cols={1} className={styles.certificateInfo}>
        <InputWrapper
          label="name"
          error={errors.certificates?.[index]?.name?.message}
        >
          <TextInput
            radius="md"
            {...register(`certificates.${index}.name` as any)}
          />
        </InputWrapper>

        <InputWrapper
          label="place of issue"
          error={errors.certificates?.[index]?.placeOfIssue?.message}
        >
          <TextInput
            radius="md"
            {...register(`certificates.${index}.placeOfIssue` as any)}
          />
        </InputWrapper>

        <SimpleGrid cols={2}>
          <InputWrapper
            label="date of issue"
            error={errors.certificates?.[index]?.dateOfIssue?.message}
            size="md"
          >
            <Controller
              name={`certificates.${index}.dateOfIssue` as any}
              control={control}
              render={({ field }) => <DatePicker {...field} radius="md" />}
            />
          </InputWrapper>

          <InputWrapper
            label="expires in"
            error={errors.certificates?.[index]?.expiresIn?.message}
            size="md"
          >
            <Controller
              name={`certificates.${index}.expiresIn` as any}
              control={control}
              render={({ field }) => (
                <DatePicker minDate={dateOfIssue} {...field} radius="md" />
              )}
            />
          </InputWrapper>
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
