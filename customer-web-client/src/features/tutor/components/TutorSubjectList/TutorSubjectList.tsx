import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { ActionIcon, Badge, Box, Card, Text } from '@mantine/core';

import { Subject } from '../../../../models/course';
import { getRandomColorScheme } from '../../../../utils';
import styles from './TutorSubjectList.module.css';

type Props = { list: Subject[]; openForm: (subject: Subject) => void };

export function TutorSubjectList({ list, openForm }: Props) {
  return (
    <>
      {list.map((subject) => (
        <SubjectCardView
          key={subject.id}
          subject={subject}
          openForm={openForm}
        />
      ))}
    </>
  );
}

type SubjectCardViewProps = Pick<Props, 'openForm'> & { subject: Subject };

function SubjectCardView({ subject, openForm }: SubjectCardViewProps) {
  const { name, educationalLevel, educationalGrade } = subject;

  return (
    <Card shadow="sm" radius="lg">
      <Box className={styles.cardContainer}>
        <Box className={styles.cardHeader}>
          <Text className={styles.name}>{name}</Text>
          <Box className={styles.cardAction}>
            <ActionIcon onClick={() => openForm(subject)}>
              <FiEdit color="var(--blue-700)" />
            </ActionIcon>
            <ActionIcon>
              <FiTrash2 color="var(--red-700)" />
            </ActionIcon>
          </Box>
        </Box>
        <Box className={styles.badgeContainer}>
          <Badge color={getRandomColorScheme()}>{educationalLevel}</Badge>
          {educationalGrade && (
            <Badge color={getRandomColorScheme()}>{educationalGrade}</Badge>
          )}
        </Box>
      </Box>
    </Card>
  );
}
