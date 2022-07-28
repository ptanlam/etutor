import { motion } from 'framer-motion';

import { Text, Title } from '@mantine/core';

import { Notification } from '../../../../models/notification';
import { getDateTimeString } from '../../../../utils';
import styles from './NotificationCardView.module.css';

type Props = { notification: Notification; onHover: (id: string) => void };

export function NotificationCardView({ notification, onHover }: Props) {
  const { title, content, createdAt, viewed, id } = notification;

  // TODO: grayed out if it's not viewed yet
  return (
    <motion.div
      whileHover={{ x: -4 }}
      className={styles.container}
      style={{ backgroundColor: viewed ? 'white' : 'var(--blue-100)' }}
      onHoverStart={() => !viewed && onHover(id)}
    >
      <Title order={5}>{title}</Title>
      <Text style={{ fontWeight: viewed ? 400 : 500 }}>{content}</Text>
      <Text color="dimmed" size="sm">
        {getDateTimeString(createdAt)}
      </Text>
    </motion.div>
  );
}
