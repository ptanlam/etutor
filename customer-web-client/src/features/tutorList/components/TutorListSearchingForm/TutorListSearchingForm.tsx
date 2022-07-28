import { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  InputWrapper,
  Select,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { ApplicationContext } from '../../../../contexts';
import { TutorListSearchingDto } from '../../../../shared/dtos/tutor';
import styles from './TutorListSearchingForm.module.css';

const schema = yup.object({
  name: yup.string().min(2).max(150).required(),
});

type Props = { onSubmit: (dto: TutorListSearchingDto) => void };

export function TutorListSearchingForm({ onSubmit }: Props) {
  const { constantsService, tutorsService } = useContext(ApplicationContext);

  const {
    control,
    watch,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<TutorListSearchingDto>({ resolver: yupResolver(schema) });

  const educationalLevelId = watch('educationalLevelId');

  const [debouncedQuery] = useDebouncedValue(watch('name'), 200);

  useEffect(() => {
    resetField('educationalGradeId');
  }, [educationalLevelId, resetField]);

  const { data: genderList } = useQuery('genders', () =>
    constantsService.getGenderList(),
  );

  const { data: academicRankList } = useQuery('academicRanks', () =>
    constantsService.getAcademicRankList(),
  );

  const { data: educationalLevelList } = useQuery('educationalLevels', () =>
    constantsService.getEducationalLevelList(),
  );

  const { data: educationalGradeList } = useQuery(
    ['educationalLevels', educationalLevelId, 'educationalGrades'],
    () => constantsService.getEducationalGradeList(educationalLevelId!),
    { enabled: !!educationalLevelId },
  );

  const { data: tutorNameList } = useQuery(
    ['tutors', 'name'],
    ({ signal }) => tutorsService.getNameList(debouncedQuery, signal),
    { enabled: !!debouncedQuery },
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Container size="lg" className={styles.container}>
        <Grid>
          <Grid.Col span={12}>
            <InputWrapper
              label="Tutor's name"
              description="please enter tutor's name"
              error={errors.name?.message}
              required
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    size="md"
                    radius="md"
                    className={styles.input}
                    nothingFound="No tutors"
                    data={tutorNameList || []}
                    minLength={2}
                  />
                )}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={6}>
            <InputWrapper
              label="Tutor's gender"
              description="please select tutor's gender"
              error={errors.genderId?.message}
            >
              <Controller
                name="genderId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    radius="md"
                    className={styles.select}
                    size="md"
                    data={
                      genderList?.map(({ name, id }) => ({
                        label: name,
                        value: id,
                      })) ?? []
                    }
                  />
                )}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={6}>
            <InputWrapper
              label="Tutor's academic rank"
              description="please select tutor's academic rank"
              error={errors.academicRankId?.message}
            >
              <Controller
                name="academicRankId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    radius="md"
                    className={styles.select}
                    size="md"
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

          <Grid.Col span={6}>
            <InputWrapper
              label="Tutor's educational level"
              description="please select tutor's educational level"
              error={errors.educationalLevelId?.message}
            >
              <Controller
                name="educationalLevelId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    radius="md"
                    className={styles.select}
                    size="md"
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
          </Grid.Col>

          <Grid.Col span={6}>
            <InputWrapper
              label="Tutor's educational grade"
              description="please select tutor's educational grade"
              error={errors.educationalGradeId?.message}
            >
              <Controller
                name="educationalGradeId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    radius="md"
                    className={styles.select}
                    size="md"
                    data={
                      educationalGradeList?.map(({ name, id }) => ({
                        label: name,
                        value: id,
                      })) ?? []
                    }
                  />
                )}
              />
            </InputWrapper>
          </Grid.Col>
        </Grid>

        <Box className={styles.action}>
          <Button type="submit" size="sm" color="orange">
            Search
          </Button>
        </Box>
      </Container>
    </form>
  );
}
