import { motion } from 'framer-motion';
import React, { useContext } from 'react';
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
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

import { ApplicationContext } from '../../../../contexts';
import { TutorRegistrationDto } from '../../../../shared/dtos/tutor';
import { StepType } from '../../../../shared/enums';
import { VisibilityProps } from '../../../../shared/props';
import { useTutorRegistrationDto } from '../../hooks';
import styles from './SubjectListCreationForm.module.css';

type Props = VisibilityProps & { onStepChange: (stepType: StepType) => void };

const subjectCreationSchema = yup.object({
  subjects: yup.array().of(
    yup.object({
      name: yup.string().max(250).required("please enter subject's name"),
      educationalLevelId: yup
        .string()
        .required('please select an educational level'),
      educationalGradeId: yup.string(),
    })
  ),
});

export function SubjectListCreationForm({ isVisible, onStepChange }: Props) {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<Pick<TutorRegistrationDto, 'subjects'>>({
    resolver: yupResolver(subjectCreationSchema),
  });

  const { fields, remove, append } = useFieldArray<
    Pick<TutorRegistrationDto, 'subjects'>
  >({
    control,
    name: 'subjects',
  });

  const { setSubjectList } = useTutorRegistrationDto();

  return (
    <>
      {isVisible && (
        <motion.form
          onSubmit={handleSubmit(setSubjectList)}
          className={styles.container}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SimpleGrid cols={1} className={styles.content}>
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

              <Title order={3}>Add subjects (optional)</Title>

              <ActionIcon type="submit" radius="xl">
                <IoIosArrowDroprightCircle
                  fontSize="1.5rem"
                  onClick={() => onStepChange(StepType.Forward)}
                />
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

            <Box className={styles.wrapper}>
              {React.Children.toArray(
                fields.map((_, index) => (
                  <SubjectCreationForm
                    index={index}
                    register={register}
                    control={control}
                    watch={watch}
                    errors={errors}
                    remove={remove}
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

type SubjectCreationFormProps = {
  index: number;
  register: UseFormRegister<Pick<TutorRegistrationDto, 'subjects'>>;
  control: Control<Pick<TutorRegistrationDto, 'subjects'>, any>;
  watch: UseFormWatch<Pick<TutorRegistrationDto, 'subjects'>>;
  errors: {
    subjects?:
      | {
          name?: FieldError | undefined;
          educationalLevelId?: FieldError | undefined;
          educationalGradeId?: FieldError | undefined;
        }[]
      | undefined;
  };
  remove: (index?: number | number[] | undefined) => void;
};

function SubjectCreationForm({
  index,
  register,
  control,
  watch,
  errors,
  remove,
}: SubjectCreationFormProps) {
  const { constantsService } = useContext(ApplicationContext);

  const educationalLevelId = watch(
    `subjects.${index}.educationalLevelId` as any
  );

  const { data: educationalLevelList } = useQuery('educationalLevels', () =>
    constantsService.getEducationalLevelList()
  );

  const { data: educationalGradeList } = useQuery(
    ['educationalLevels', educationalLevelId, 'educationalGrades'],
    () => constantsService.getEducationalGradeList(educationalLevelId!),
    { enabled: !!educationalLevelId }
  );

  return (
    <Grid align="center" gutter="xl">
      <Grid.Col span={11}>
        <SimpleGrid cols={3}>
          <InputWrapper
            label="subject name"
            error={errors.subjects?.[index]?.name?.message}
          >
            <TextInput
              radius="md"
              {...register(`subjects.${index}.name` as any)}
            />
          </InputWrapper>

          <InputWrapper
            label="educational level"
            error={errors.subjects?.[index]?.educationalLevelId?.message}
          >
            <Controller
              name={`subjects.${index}.educationalLevelId` as any}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  radius="md"
                  data={
                    educationalLevelList?.map(({ name, id }) => ({
                      label: name,
                      value: id,
                    })) ?? []
                  }
                />
              )}
            />
          </InputWrapper>

          <InputWrapper
            label="educational grade"
            error={errors.subjects?.[index]?.educationalGradeId?.message}
          >
            <Select
              radius="md"
              name={`subjects.${index}.educationalGradeId` as any}
              data={
                educationalGradeList?.map(({ name, id }) => ({
                  label: name,
                  value: id,
                })) ?? []
              }
            />
          </InputWrapper>
        </SimpleGrid>
      </Grid.Col>

      <Grid.Col span={1}>
        <ActionIcon variant="hover" onClick={() => remove(index)} color="red">
          <AiOutlineMinusCircle fontSize="1.4rem" />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
}
