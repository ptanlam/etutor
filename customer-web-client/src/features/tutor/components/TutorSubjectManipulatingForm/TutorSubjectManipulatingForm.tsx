import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Input, InputWrapper, Select, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { ErrorIndicator } from '../../../../components/ErrorIndicator';
import {
  EducationalGrade,
  EducationalLevel,
} from '../../../../models/constant';
import { Subject } from '../../../../models/course';
import { SubjectCreationDto } from '../../../../shared/dtos/course';
import { useAddSubject, useUpdateSubject } from '../../hooks';
import styles from './TutorSubjectManipulatingForm.module.css';

const schema = yup.object({
  name: yup.string().max(250).required(),
  educationalLevelId: yup.string().required(),
  educationalGradeId: yup.string(),
});

type Props = {
  tutorId: string;
  educationalLevelList: EducationalLevel[];
  educationalGradeList: EducationalGrade[];
  onEducationalLevelChange: (id: string) => void;
  onClose: () => void;
  subject?: Subject;
};

export function TutorSubjectManipulatingForm({
  tutorId,
  educationalLevelList,
  educationalGradeList,
  onEducationalLevelChange,
  onClose,
  subject,
}: Props) {
  const isUpdating = !!subject;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<SubjectCreationDto>({
    resolver: yupResolver(schema),
  });

  const { openConfirmModal } = useModals();

  const { mutateAsync: addSubject, isLoading: adding } = useAddSubject(tutorId);
  const { mutateAsync: updateSubject, isLoading: updating } =
    useUpdateSubject(tutorId);

  //#region 'set form default values'
  useEffect(() => {
    if (!educationalLevelList.length || !subject?.educationalLevel) return;

    const educationalLevel = educationalLevelList.find(
      (e) => e.name === subject.educationalLevel
    );
    if (!educationalLevel) return;

    onEducationalLevelChange(educationalLevel.id);
    setValue('educationalLevelId', educationalLevel.id);
  }, [
    educationalLevelList,
    subject?.educationalLevel,
    onEducationalLevelChange,
    setValue,
  ]);

  useEffect(() => {
    if (
      !educationalGradeList.length ||
      !subject?.educationalLevel ||
      !subject?.educationalGrade
    )
      return;

    const educationalGrade = educationalGradeList.find(
      (e) => e.name === subject.educationalGrade
    );
    if (!educationalGrade) return;

    setValue('educationalGradeId', educationalGrade.id);
  }, [
    educationalGradeList,
    subject?.educationalGrade,
    subject?.educationalLevel,
    setValue,
  ]);
  //#endregion

  if (isUpdating && !subject) return <ErrorIndicator />;

  const onSubmit = async (dto: SubjectCreationDto) => {
    // TODO: implement delete subject

    if (isUpdating && !!subject?.id) {
      const { id } = subject;
      await updateSubject({ dto, id });
    } else {
      await addSubject(dto);
    }

    onClose();
  };

  const onCancelClick = () => {
    if (!hasValue) onClose();
    else {
      openConfirmModal({
        title: 'warning',
        children: (
          <Text>
            you really want to close this form and lose all your information?
          </Text>
        ),
        labels: { confirm: 'confirm', cancel: 'cancel' },
        onConfirm: () => onClose(),
        closeOnCancel: true,
      });
    }

    // clearTutorProfile();
  };

  const hasValue = !!Object.keys(dirtyFields).length;

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper
        label="name"
        description="please enter subject's name"
        error={errors.name?.message}
        required
      >
        <Input
          size="sm"
          radius="md"
          defaultValue={subject?.name}
          {...register('name')}
        />
      </InputWrapper>

      <InputWrapper
        label="Tutor's educational level"
        description="Please select tutor's educational level"
        error={errors.educationalLevelId?.message}
      >
        <Controller
          name="educationalLevelId"
          control={control}
          render={({ field: { onChange, ...rest } }) => (
            <Select
              {...rest}
              onChange={(level) => {
                if (!level) return;
                onEducationalLevelChange(level);
                onChange(level);
              }}
              radius="md"
              size="sm"
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
        label="Tutor's educational grade"
        description="Please select tutor's educational grade"
        error={errors.educationalGradeId?.message}
      >
        <Controller
          name="educationalGradeId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              radius="md"
              size="sm"
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

      <Box className={styles.actionContainer}>
        <Button
          color="red"
          size="sm"
          disabled={adding || updating}
          onClick={onCancelClick}
        >
          Cancel
        </Button>
        <Button size="sm" type="submit" loading={adding || updating}>
          {isUpdating ? 'update' : 'add'}
        </Button>
      </Box>
    </form>
  );
}
