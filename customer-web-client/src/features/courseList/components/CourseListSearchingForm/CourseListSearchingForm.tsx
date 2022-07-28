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
import { DatePicker, TimeInput } from '@mantine/dates';
import { useDebouncedValue } from '@mantine/hooks';

import { ApplicationContext } from '../../../../contexts';
import { CourseListSearchingDto } from '../../../../shared/dtos/course';
import styles from './CourseListSearchingForm.module.css';

type Props = { onSubmit: (dto: CourseListSearchingDto) => void };

const schema = yup.object({
  subjectName: yup.string().max(250).required(),
});

export function CourseListSearchingForm({ onSubmit }: Props) {
  const { constantsService, coursesService } = useContext(ApplicationContext);

  const {
    control,
    watch,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<CourseListSearchingDto>({ resolver: yupResolver(schema) });

  const [debouncedQuery] = useDebouncedValue(watch('subjectName'), 200);

  const educationalLevelId = watch('educationalLevelId');

  useEffect(() => {
    resetField('educationalGradeId');
  }, [educationalLevelId, resetField]);

  const { data: educationalLevelList } = useQuery('educationalLevels', () =>
    constantsService.getEducationalLevelList(),
  );

  const { data: educationalGradeList } = useQuery(
    ['educationalLevels', educationalLevelId, 'educationalGrades'],
    () => constantsService.getEducationalGradeList(educationalLevelId!),
    { enabled: !!educationalLevelId },
  );

  const { data: subjectNameList } = useQuery(
    ['subjects', 'name'],
    ({ signal }) => coursesService.getSubjectNameList(debouncedQuery, signal),
    {
      enabled: !!debouncedQuery,
    },
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Container size="lg" className={styles.container}>
        <Grid>
          <Grid.Col span={12}>
            <InputWrapper
              label="Subject's name"
              description="please enter subject's name"
              error={errors.subjectName?.message}
              required
            >
              <Controller
                name="subjectName"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    size="md"
                    radius="md"
                    inputMode="search"
                    className={styles.input}
                    nothingFound="No tutors"
                    data={subjectNameList || []}
                  />
                )}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={6}>
            <InputWrapper
              label="Start date"
              description="please select start date"
              error={errors.startDate?.message}
            >
              <Controller
                name="startDate"
                control={control}
                render={({ field: { value, ...rest } }) => (
                  <DatePicker
                    size="lg"
                    className={styles.select}
                    radius="md"
                    minDate={new Date()}
                    value={value ? new Date(value) : null}
                    {...rest}
                  />
                )}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={6}>
            <InputWrapper
              label="Start time"
              description="please select start time"
              error={errors.startAt?.message}
            >
              <Controller
                name="startAt"
                control={control}
                render={({ field: { value, onChange, ...rest } }) => (
                  <TimeInput
                    size="lg"
                    className={styles.select}
                    radius="md"
                    onChange={(date) =>
                      onChange(`${date.getHours()}:${date.getMinutes()}`)
                    }
                    {...rest}
                  />
                )}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={6}>
            <InputWrapper
              label="Educational level"
              description="please select educational level"
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
                    size="lg"
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
              label="Educational grade"
              description="please select educational grade"
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
                    size="lg"
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
