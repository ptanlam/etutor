import { useForm } from 'react-hook-form';

import { Avatar, Input } from '@mantine/core';

import { useAppSelector } from '../../../../app/hooks';
import { FeedbackCreationDto } from '../../../../shared/dtos/feedback';
import { userDetailsSelector } from '../../../user/userSlice';
import styles from './FeedbackForm.module.css';

type Props = {
  topicId: string;
  onSubmit: (dto: FeedbackCreationDto) => Promise<void>;
};

export function FeedbackForm({ topicId, onSubmit: submit }: Props) {
  const { id: userId, avatarUrl } = useAppSelector(userDetailsSelector);

  const { register, handleSubmit, resetField } = useForm<FeedbackCreationDto>({
    defaultValues: {
      topicId,
      ownerId: userId,
    },
  });

  const onSubmit = async (dto: FeedbackCreationDto) => {
    await submit(dto);
    resetField('content');
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <Avatar src={avatarUrl} radius="xl" />
      <Input
        placeholder="Write a feedback..."
        style={{ flex: 1 }}
        {...register('content')}
      />
    </form>
  );
}
