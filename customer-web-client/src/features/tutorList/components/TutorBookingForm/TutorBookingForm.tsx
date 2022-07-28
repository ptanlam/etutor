import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  Chip,
  Chips,
  Grid,
  InputWrapper,
  Modal,
  Select,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';

import { useAppSelector } from '../../../../app/hooks';
import { Wrapper } from '../../../../components/Wrapper';
import { weekDays } from '../../../../constants/shared';
import { ApplicationContext } from '../../../../contexts';
import { useTimezoneOffset } from '../../../../hooks';
import { Tutor } from '../../../../models/tutor';
import { EnrollmentCreationDto } from '../../../../shared/dtos/enrollment';
import { formatTime } from '../../../../utils';
import { userDetailsSelector } from '../../../user/userSlice';
import styles from './TutorBookingForm.module.css';

type Props = {
  opened: boolean;
  onClose: () => void;
  tutor: Partial<Tutor>;
};

const schema = yup.object({
  startDate: yup.date().min(new Date()).required(),
  startAt: yup.string().length(5).required(),

  endDate: yup.date().min(new Date()).required(),
  endAt: yup.string().length(5).required(),

  learningDays: yup.array().min(1).of(yup.string()).required(),
});

type BookingFormDto = Required<
  Pick<
    EnrollmentCreationDto,
    'startDate' | 'endDate' | 'startAt' | 'endAt' | 'learningDays' | 'subjectId'
  >
>;
export function TutorBookingForm({ opened, onClose, tutor }: Props) {
  const navigate = useNavigate();
  const { coursesService, sessionsService } = useContext(ApplicationContext);
  const timezoneOffset = useTimezoneOffset();
  const { id } = useAppSelector(userDetailsSelector);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormDto>({
    resolver: yupResolver(schema),
  });

  const { id: studentId } = useSelector(userDetailsSelector);

  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const startAt = watch('startAt');
  const endAt = watch('endAt');
  const learningDays = watch('learningDays');

  const { data: checkOverlappingResult, isLoading: checking } = useQuery(
    [
      'checkOverlappingSession',
      id,
      startDate,
      endDate,
      startAt,
      endAt,
      learningDays,
      timezoneOffset,
    ],
    async () => {
      const result = await Promise.all(
        [
          { prefix: 'Tutor is', id: tutor!.id! },
          { prefix: 'You are', id },
        ].map(async ({ prefix, id }) => ({
          prefix,
          isOverlapping: await sessionsService.checkOverlapping(
            startDate,
            endDate,
            startAt,
            endAt,
            learningDays,
            timezoneOffset,
            id,
          ),
        })),
      );

      return result.filter((each) => each.isOverlapping);
    },
    {
      enabled:
        !!tutor &&
        !!tutor?.id &&
        !!startDate &&
        !!endDate &&
        !!startAt &&
        !!endAt &&
        !!learningDays &&
        !!learningDays.length,
    },
  );

  const {
    data: tuitionFee,
    isFetching: isCalculatingTuition,
    isError: calculationTuitionFailed,
  } = useQuery(
    [
      'sessions',
      'hours',
      startDate,
      endDate,
      startAt,
      endAt,
      JSON.stringify(learningDays),
    ],
    async () => {
      const totalHours = await sessionsService.getTotalHours(
        startDate,
        endDate,
        startAt,
        endAt,
        learningDays,
      );

      return {
        amount: totalHours * (tutor.rentalAmount || 0),
        unit: tutor.rentalUnit || 'N/A',
      };
    },
    {
      enabled:
        !!startDate &&
        !!endDate &&
        !!startAt &&
        !!endAt &&
        !!learningDays &&
        !!learningDays.length,
    },
  );

  const { data: subjectList } = useQuery(
    ['tutors', tutor.id, 'subjects'],
    () => coursesService.getSubjectListForTutor(tutor.id!),
    {
      enabled: !!tutor.id,
    },
  );

  const onSubmit = async (dto: BookingFormDto) => {
    if (!tuitionFee || !tutor?.id) return;

    const enrollmentCreationDto: EnrollmentCreationDto = {
      ...dto,
      tuitionAmount: tuitionFee.amount,
      tuitionUnit: tuitionFee.unit,
      tutorId: tutor.id,
      studentId,
    };

    navigate('/payment/checkout', { state: enrollmentCreationDto });
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Booking form"
      centered
      radius="lg"
    >
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Information label="Tutor's name" value={tutor.fullName} />
        <Information
          label="Rental fee"
          value={`${tutor.rentalAmount?.toLocaleString()} ${
            tutor.rentalUnit
          } / hr`}
        />

        <InputWrapper
          label="Subject"
          description="please select subject"
          error={errors.subjectId?.message}
        >
          <Controller
            name="subjectId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles.select}
                size="sm"
                data={
                  subjectList?.map(({ name, id }) => ({
                    label: name,
                    value: id,
                  })) ?? []
                }
              />
            )}
          />
        </InputWrapper>

        <SimpleGrid cols={2}>
          <InputWrapper
            label="Start date"
            description="please select start date"
            error={errors.startDate?.message}
            size="sm"
          >
            <Controller
              name="startDate"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <DatePicker
                  radius="sm"
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
            description="please select end date"
            error={errors.endDate?.message}
            size="sm"
          >
            <Controller
              name="endDate"
              control={control}
              render={({ field: { value, ...rest } }) => (
                <DatePicker
                  radius="sm"
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
            description="please enter start time"
            error={errors.startAt?.message}
            size="sm"
          >
            <Controller
              name="startAt"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <TimeInput
                  radius="sm"
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
            description="please enter end time"
            error={errors.endAt?.message}
            size="sm"
          >
            <Controller
              name="endAt"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <TimeInput
                  radius="sm"
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
        </SimpleGrid>

        <InputWrapper
          label="Learning days"
          description="please enter learning days"
          error={
            errors?.learningDays && 'please select at least 1 learning day'
          }
          size="sm"
        >
          <Controller
            name="learningDays"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Chips
                multiple
                {...rest}
                color="indigo"
                variant="filled"
                radius="sm"
                className={styles.learningDaysContainer}
              >
                {React.Children.toArray(
                  weekDays.map((day) => (
                    <Chip
                      value={day.toLocaleLowerCase()}
                      className={styles.learningDayItem}
                    >
                      {day}
                    </Chip>
                  )),
                )}
              </Chips>
            )}
          />
        </InputWrapper>

        <Wrapper<{ amount: number; unit: string }>
          type="component"
          data={tuitionFee}
          loading={isCalculatingTuition}
          hasError={calculationTuitionFailed}
          noLoadingComponent
        >
          <Information
            label="Tuition"
            value={`${tuitionFee?.amount.toLocaleString() || 0} ${
              tutor.rentalUnit
            }`}
          />
        </Wrapper>

        {checkOverlappingResult?.length ? (
          <Alert title="Caution" color="orange">
            {checkOverlappingResult?.[0]?.prefix} busy in selected period.
          </Alert>
        ) : (
          <></>
        )}

        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            size="xs"
            radius="md"
            color="green"
            disabled={!!checkOverlappingResult?.length}
            loading={checking}
          >
            Book
          </Button>
        </Box>
      </form>
    </Modal>
  );
}

type InformationProps = { label: string; value?: string | number };

function Information({ label, value }: InformationProps) {
  return (
    <Grid columns={10} align="center" style={{ flex: 1 }}>
      <Grid.Col span={3}>
        <Text size="sm">{label}</Text>
      </Grid.Col>
      <Grid.Col span={7}>
        <Text size="sm">{value || ''}</Text>
      </Grid.Col>
    </Grid>
  );
}
