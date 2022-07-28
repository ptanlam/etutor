import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import { Box, Text } from '@mantine/core';

import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { useAppPagination } from '../../../../hooks';
import { Feedback } from '../../../../models/feedback';
import { FeedbackCreationDto } from '../../../../shared/dtos/feedback';
import { FeedbackCardView } from '../../components/FeedbackCardView';
import { FeedbackForm } from '../../components/FeedbackForm';
import { usePostFeedback } from '../../hooks';
import styles from './FeedbackListManagement.module.css';

type Props = { topicId: string; canPost?: boolean };

export function FeedbackListManagement({ topicId, canPost }: Props) {
  const { feedbacksService } = useContext(ApplicationContext);
  const { pageNumber, pageSize, onPaginationMetaChange } = useAppPagination();

  const { data, isLoading, isError } = useQuery(
    ['feedbacks', topicId],
    async () => {
      const { data: feedbacks, pagination } =
        await feedbacksService.getListForTopic(topicId, {
          pageNumber,
          pageSize,
        });

      onPaginationMetaChange(pagination);
      return feedbacks;
    }
  );

  const { mutateAsync: post } = usePostFeedback();

  const onSubmit = async (dto: FeedbackCreationDto) => {
    await post(dto);
  };

  return (
    <Box className={styles.container}>
      {canPost && <FeedbackForm topicId={topicId} onSubmit={onSubmit} />}
      <Wrapper<Feedback[]>
        type="component"
        loading={isLoading}
        hasError={isError}
        data={data}
      >
        {data?.length ? (
          <Box className={styles.listContainer}>
            {data?.map((feedback) => (
              <FeedbackCardView key={feedback.id} feedback={feedback} />
            ))}
          </Box>
        ) : (
          <Text>There are no feedbacks.</Text>
        )}
      </Wrapper>
    </Box>
  );
}
