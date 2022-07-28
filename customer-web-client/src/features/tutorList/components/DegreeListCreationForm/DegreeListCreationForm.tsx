import { motion } from 'framer-motion';
import React, { useContext, useRef } from 'react';
import {
  Control,
  Controller,
  FieldError,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { useQuery } from 'react-query';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  ActionIcon,
  Box,
  Grid,
  InputWrapper,
  Select,
  SimpleGrid,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { ImageInput } from '../../../../components/ImageInput';
import { ApplicationContext } from '../../../../contexts';
import { useImageUploading } from '../../../../hooks';
import { AcademicRank } from '../../../../models/constant';
import { TutorRegistrationDto } from '../../../../shared/dtos/tutor';
import { StepType } from '../../../../shared/enums';
import { VisibilityProps } from '../../../../shared/props';
import { useTutorRegistrationDto } from '../../hooks';
import styles from './DegreeListCreationForm.module.css';

type Props = VisibilityProps & { onStepChange: (stepType: StepType) => void };

const schema = yup.object({
  degrees: yup
    .array()
    .of(
      yup.object({
        name: yup.string().max(250).required(),
        major: yup.string().max(250).required(),
        graduatedUniversity: yup.string().max(250).required(),
        dateOfIssue: yup.date().required(),
        academicRankId: yup.string().max(250).required(),
      })
    )
    .min(1)
    .required(),
});

export function DegreeListCreationForm({ isVisible, onStepChange }: Props) {
  const { constantsService } = useContext(ApplicationContext);
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<Pick<TutorRegistrationDto, 'degrees'>>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'degrees',
  });

  const { setDegreeList } = useTutorRegistrationDto();

  const { data: academicRankList } = useQuery('academic ranks', () =>
    constantsService.getAcademicRankList()
  );

  return (
    <>
      {isVisible && (
        <motion.form
          className={styles.container}
          onSubmit={handleSubmit(setDegreeList)}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SimpleGrid cols={1} spacing={32}>
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

                <Title order={3}>Add degrees</Title>

                <ActionIcon
                  type="submit"
                  radius="xl"
                  disabled={fields.length < 1 || !isValid}
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

            <Box className={styles.listContainer}>
              {React.Children.toArray(
                fields.map((_, index) => (
                  <DegreeCreationForm
                    index={index}
                    academicRankList={academicRankList || []}
                    register={register}
                    control={control}
                    errors={errors}
                    remove={remove}
                    setValue={setValue}
                  />
                ))
              )}
            </Box>
          </SimpleGrid>
        </motion.form>
      )}
    </>
  );
}

type DegreeCreationFormProps = {
  index: number;
  academicRankList: AcademicRank[];
  register: UseFormRegister<Pick<TutorRegistrationDto, 'degrees'>>;
  control: Control<Pick<TutorRegistrationDto, 'degrees'>, any>;
  remove: UseFieldArrayRemove;
  errors: {
    degrees?:
      | {
          academicRankId?: FieldError | undefined;
          dateOfIssue?: FieldError | undefined;
          name?: FieldError | undefined;
          major?: FieldError | undefined;
          graduatedUniversity?: FieldError | undefined;
        }[]
      | undefined;
  };
  setValue: UseFormSetValue<Pick<TutorRegistrationDto, 'degrees'>>;
};

function DegreeCreationForm({
  index,
  academicRankList,
  register,
  control,
  remove,
  errors,
  setValue,
}: DegreeCreationFormProps) {
  const fileUploadingInputRef = useRef<HTMLInputElement>(null);
  const { image, uploadImage } = useImageUploading();

  const onImageClick = () => {
    fileUploadingInputRef.current?.click();
  };

  const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadImage(event);
    if (!event.currentTarget.files) return;
    setValue(`degrees.${index}.images`, event.currentTarget.files);
  };

  return (
    <Grid className={styles.degreeContainer} gutter={24}>
      <Grid.Col className={styles.closeBtn}>
        <ActionIcon
          variant="filled"
          radius="xl"
          color="red"
          onClick={() => remove(index)}
        >
          <AiOutlineClose />
        </ActionIcon>
      </Grid.Col>

      <Grid.Col
        span={4}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <ImageInput
          image={image}
          uploadImage={onUploadImage}
          label="Picture of degree"
          onImageClick={onImageClick}
          {...register(`degrees.${index}.images` as any)}
          ref={fileUploadingInputRef}
        />
      </Grid.Col>

      <Grid.Col span={8}>
        <Grid>
          <Grid.Col span={6}>
            <InputWrapper
              label="name"
              error={errors.degrees?.[index]?.name?.message}
            >
              <TextInput
                radius="md"
                {...register(`degrees.${index}.name` as any)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={6}>
            <InputWrapper
              label="academic rank"
              error={errors.degrees?.[index]?.academicRankId?.message}
            >
              <Controller
                name={`degrees.${index}.academicRankId` as any}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    radius="md"
                    data={
                      academicRankList?.map(({ name, id }) => ({
                        label: name,
                        value: id,
                      })) ?? []
                    }
                  />
                )}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <InputWrapper
              label="graduated university"
              error={errors.degrees?.[index]?.graduatedUniversity?.message}
            >
              <TextInput
                radius="md"
                {...register(`degrees.${index}.graduatedUniversity` as any)}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <SimpleGrid cols={2}>
              <InputWrapper
                label="major"
                error={errors.degrees?.[index]?.major?.message}
              >
                <TextInput
                  radius="md"
                  {...register(`degrees.${index}.major` as any)}
                />
              </InputWrapper>

              <InputWrapper
                label="date of issue"
                error={errors.degrees?.[index]?.dateOfIssue?.message}
                size="md"
              >
                <Controller
                  name={`degrees.${index}.dateOfIssue` as any}
                  control={control}
                  render={({ field: { value, ...rest } }) => (
                    <DatePicker
                      radius="md"
                      value={value ? new Date(value) : null}
                      {...rest}
                    />
                  )}
                />
              </InputWrapper>
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}
