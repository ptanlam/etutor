import { AxiosError } from 'axios';
import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillAlert } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mantine/core';
import {
  Button,
  Chip,
  Chips,
  Grid,
  Image,
  Input,
  InputWrapper,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  Title,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';

import {
  imageExtensions,
  placeholderImage,
  weekDays,
} from '../../../../constants/shared';
import { ApplicationContext } from '../../../../contexts';
import { useImageUploading, useTimezoneOffset } from '../../../../hooks';
import { Subject } from '../../../../models/course';
import { PagedListRequest } from '../../../../models/shared';
import { OnlineCourseRegistrationDto } from '../../../../shared/dtos/course';
import { formatTime } from '../../../../utils';
import { useRegisterOnlineCourse } from '../../hooks';
import { tutorDetailsSelector } from '../../tutorSlice';
import styles from './TutorCourseRegistrationForm.module.css';

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  maxNumberOfStudents: yup.string().required(),

  startDate: yup.date().min(new Date()).required(),
  endDate: yup.date().min(new Date()).required(),

  startAt: yup.string().length(5).required(),
  endAt: yup.string().length(5).required(),

  tuitionFeeAmount: yup.number().min(0).required(),
  tuitionFeeUnit: yup.string().length(3).required(),

  subjectId: yup.string().required(),
  learningDays: yup.array().min(1).of(yup.string()).required(),
  syllabi: yup.array().default([]),
});

type Props = {
  opened: boolean;
  subjectList: Subject[];
  selectedSubject: string;
  pagedListRequest: PagedListRequest;
  onClose: () => void;
};

export function TutorCourseRegistrationForm({
  opened,
  selectedSubject,
  subjectList,
  pagedListRequest,
  onClose,
}: Props) {
  const { constantsService, sessionsService } = useContext(ApplicationContext);
  const timezoneOffset = useTimezoneOffset();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnlineCourseRegistrationDto>({ resolver: yupResolver(schema) });

  const { id: tutorId } = useSelector(tutorDetailsSelector);

  const { data: currencyList } = useQuery('currencies', () =>
    constantsService.getCurrencyList(),
  );

  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const startAt = watch('startAt');
  const endAt = watch('endAt');
  const learningDays = watch('learningDays');

  const { data: isOverlapping } = useQuery(
    [
      'checkOverlappingSession',
      tutorId,
      startDate,
      endDate,
      startAt,
      endAt,
      learningDays,
      timezoneOffset,
    ],
    () =>
      sessionsService.checkOverlapping(
        startDate,
        endDate,
        startAt,
        endAt,
        learningDays,
        timezoneOffset,
        tutorId,
      ),
  );

  const {
    mutateAsync: registerOnlineCourse,
    isLoading: isRegistering,
    error,
    isError,
  } = useRegisterOnlineCourse(
    tutorId,
    pagedListRequest.pageNumber,
    pagedListRequest.pageSize,
  );

  const { image, uploadImage } = useImageUploading();

  useEffect(() => {
    if (!selectedSubject) return;
    setValue('subjectId', selectedSubject);
  }, [selectedSubject, setValue]);

  const onSubmit = async (dto: Omit<OnlineCourseRegistrationDto, 'type'>) => {
    await registerOnlineCourse(dto);
    onClose();
  };

  const onCloseClick = () => {
    if (isRegistering) return;
    onClose();
  };

  return (
    <Modal
      title={<Title order={3}>Register new course</Title>}
      radius="lg"
      opened={opened}
      onClose={onCloseClick}
      centered
      size="xl"
      overflow="inside"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={5}>
            <InputWrapper
              label="Thumbnail"
              description="Please select thumbnail"
              error={errors.thumbnail?.message}
              required
              size="md"
            >
              <Image src={image ?? placeholderImage} />
              <Input
                {...register('thumbnail')}
                type="file"
                accept={imageExtensions}
                onChange={uploadImage}
                multiple={false}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={7} className={styles.container}>
            <InputWrapper
              label="Name"
              description="Please enter course's name"
              error={errors.name?.message}
              required
              size="md"
            >
              <Input radius="md" {...register('name')} />
            </InputWrapper>

            <InputWrapper
              label="Subject"
              description="Please select subject"
              error={errors.subjectId?.message}
              size="md"
            >
              <Controller
                name="subjectId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    radius="md"
                    data={
                      subjectList.map(({ name, id }) => ({
                        label: name,
                        value: id,
                      })) ?? []
                    }
                  />
                )}
              />
            </InputWrapper>

            <InputWrapper
              label="Max number of students"
              description="Please enter max number of students"
              error={errors.maxNumberOfStudents?.message}
              size="md"
            >
              <Controller
                name="maxNumberOfStudents"
                control={control}
                render={({ field }) => (
                  <NumberInput min={1} radius="md" {...field} />
                )}
              />
            </InputWrapper>
          </Grid.Col>

          <Grid.Col span={12} className={styles.container}>
            <SimpleGrid cols={2}>
              <InputWrapper
                label="Start date"
                description="Please select start date"
                error={errors.startDate?.message}
                size="md"
              >
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <DatePicker
                      radius="md"
                      minDate={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                      }
                      value={value ? new Date(value) : null}
                      onChange={(chosenDate) => {
                        if (!chosenDate) return;
                        setValue('endDate', chosenDate);
                        onChange(chosenDate);
                      }}
                      {...rest}
                    />
                  )}
                />
              </InputWrapper>

              <InputWrapper
                label="End date"
                description="Please select end date"
                error={errors.endDate?.message}
                size="md"
              >
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field: { value, ...rest } }) => (
                    <DatePicker
                      radius="md"
                      disabled={!startDate}
                      minDate={new Date(startDate)}
                      value={value ? new Date(value) : null}
                      {...rest}
                    />
                  )}
                />
              </InputWrapper>

              <InputWrapper
                label="Start time"
                description="Please enter start time"
                error={errors.startAt?.message}
                size="md"
              >
                <Controller
                  name="startAt"
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <TimeInput
                      radius="md"
                      onChange={(date) =>
                        onChange(
                          `${formatTime(date.getHours())}:${formatTime(
                            date.getMinutes(),
                          )}`,
                        )
                      }
                      {...rest}
                    />
                  )}
                />
              </InputWrapper>

              <InputWrapper
                label="End time"
                description="Please enter end time"
                error={errors.endAt?.message}
                size="md"
              >
                <Controller
                  name="endAt"
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <TimeInput
                      radius="md"
                      onChange={(date) =>
                        onChange(
                          `${formatTime(date.getHours())}:${formatTime(
                            date.getMinutes(),
                          )}`,
                        )
                      }
                      {...rest}
                    />
                  )}
                />
              </InputWrapper>

              <InputWrapper
                label="Tuition fee amount"
                description="Please enter tuition fee amount"
                error={errors.tuitionFeeAmount?.message}
                size="md"
              >
                <Controller
                  name="tuitionFeeAmount"
                  control={control}
                  render={({ field }) => <NumberInput radius="md" {...field} />}
                />
              </InputWrapper>

              <InputWrapper
                label="Tuition fee unit"
                description="Please enter tuition fee unit"
                error={errors.tuitionFeeUnit?.message}
                required
                size="md"
              >
                <Controller
                  name="tuitionFeeUnit"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      radius="md"
                      size="sm"
                      data={
                        currencyList?.map(({ code }) => ({
                          label: code,
                          value: code,
                        })) ?? []
                      }
                    />
                  )}
                />
              </InputWrapper>
            </SimpleGrid>

            <InputWrapper
              label="Description"
              description="Please enter description"
              error={errors.description?.message}
              size="md"
            >
              <Textarea radius="md" {...register('description')} />
            </InputWrapper>

            <InputWrapper
              label="Learning days"
              description="Please enter learning days"
              error={
                errors?.learningDays && 'Please select at least 1 learning day'
              }
              size="md"
            >
              <Controller
                name="learningDays"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <Chips multiple {...rest}>
                    {React.Children.toArray(
                      weekDays.map((day) => (
                        <Chip value={day.toLocaleLowerCase()}>{day}</Chip>
                      )),
                    )}
                  </Chips>
                )}
              />
            </InputWrapper>
          </Grid.Col>

          {isError && (
            <Grid.Col span={12}>
              <Alert
                icon={<AiFillAlert size={16} />}
                title="Caution!"
                color="orange"
              >
                {(error as AxiosError)?.response?.data ||
                  'Something wrong happened!'}
              </Alert>
            </Grid.Col>
          )}

          {isOverlapping ? (
            <Grid.Col span={12}>
              <Alert title="Caution" color="orange">
                You are busy in selected period.
              </Alert>
            </Grid.Col>
          ) : (
            <></>
          )}

          <Grid.Col className={styles.actionContainer} span={12}>
            <Button
              size="xs"
              color="red"
              disabled={isRegistering}
              onClick={onCloseClick}
            >
              Cancel
            </Button>
            <Button
              size="xs"
              type="submit"
              disabled={isOverlapping || isRegistering}
              loading={isRegistering}
            >
              Register
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
}
