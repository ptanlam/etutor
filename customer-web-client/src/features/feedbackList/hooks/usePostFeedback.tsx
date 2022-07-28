import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ApplicationContext } from '../../../contexts';
import { FeedbackCreationDto } from '../../../shared/dtos/feedback';

export function usePostFeedback() {
  const { feedbacksService } = useContext(ApplicationContext);

  const queryClient = useQueryClient();

  return useMutation(
    async (dto: FeedbackCreationDto) => {
      // TODO: get access token
      const accessToken = '';
      return feedbacksService.postNew(dto, accessToken);
    },
    {
      onSuccess: (feedback, { topicId }) => {
        queryClient.invalidateQueries(['feedbacks', topicId]);
      },
    }
  );
}
