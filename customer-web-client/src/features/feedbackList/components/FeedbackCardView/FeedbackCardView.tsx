import { Avatar, Box, Text, Title } from '@mantine/core';

import { Feedback } from '../../../../models/feedback';
import { getDateString } from '../../../../utils';
import styles from './FeedbackCardView.module.css';

type Props = { feedback: Feedback };

export function FeedbackCardView({ feedback }: Props) {
  const { content, createdAt, owner } = feedback;

  return (
    <Box className={styles.container}>
      <Avatar src={owner.avatarUrl} size="lg" radius="xl" />
      <Box className={styles.contentContainer}>
        <Title order={5}>{`${owner.firstName} ${owner.lastName}`}</Title>
        <Text>{content}</Text>
        <Text color="dimmed" size="xs">
          {getDateString(createdAt)}
        </Text>
      </Box>
    </Box>
  );
}
