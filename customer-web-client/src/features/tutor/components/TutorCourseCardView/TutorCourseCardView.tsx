import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';

import { Badge, Box, Button, Grid, Text, Title } from '@mantine/core';

import { placeholderImage } from '../../../../constants/shared';
import { CourseCardView as CourseCardViewModel } from '../../../../models/course';
import { getDateString, getTimeFromDate } from '../../../../utils';
import styles from './TutorCourseList.module.css';

type CourseCardViewProps = {
  course: CourseCardViewModel;
  onApproveClick: (id: string) => void;
};

export function TutorCourseCardView({
  course,
  onApproveClick,
}: CourseCardViewProps) {
  const [thumbnailHovered, setThumbnailHovered] = useState(false);

  const {
    id,
    educationalLevel,
    educationalGrade,
    tuitionFeeAmount,
    tuitionFeeUnit,
    learningDays,
    thumbnail,
    isActive,
    subjectName,
  } = course;

  const startDate = new Date(course.startDate);
  const startAt = getTimeFromDate(startDate);
  const endDate = new Date(course.endDate);
  const endAt = getTimeFromDate(endDate);

  const isOneOnOneCourse = !course?.name;

  return (
    <motion.div className={styles.cardContainer}>
      <Box
        className={styles.cardThumbnailContainer}
        onMouseEnter={() => setThumbnailHovered(true)}
        onMouseLeave={() => setThumbnailHovered(false)}
      >
        <motion.div
          transition={{ duration: 0.15 }}
          style={{
            backgroundImage: `url(${
              thumbnail ? thumbnail.url : placeholderImage
            })`,
          }}
          animate={{
            scale: thumbnailHovered ? 1.1 : 1,
            filter: `${thumbnailHovered ? 'grayscale()' : ''} blur(${
              thumbnailHovered ? '4px' : '0px'
            })`,
          }}
          className={styles.cardThumbnail}
        />

        <motion.div
          transition={{ duration: 0.2 }}
          className={styles.actionContainer}
          animate={{
            display: thumbnailHovered ? 'flex' : 'none',
            opacity: thumbnailHovered ? 1 : 0,
          }}
        >
          <Button size="xs" color="indigo">
            Edit syllabi
          </Button>
          <Button size="xs" color="orange">
            Remove
          </Button>
        </motion.div>
      </Box>

      <Box className={styles.informationContainer}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title order={2} style={{ fontWeight: 900 }}>
            {subjectName}
          </Title>
          {isOneOnOneCourse ? (
            course?.tutorApproved ? (
              <Text color="green">Accepted</Text>
            ) : (
              <Button size="xs" onClick={() => onApproveClick(id)}>
                Accept
              </Button>
            )
          ) : (
            <></>
          )}
        </Box>
        <Text>{course?.name}</Text>

        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isActive ? (
            <Badge color="green">Approved by admin</Badge>
          ) : (
            <Badge color="red">Unapproved by admin</Badge>
          )}
        </Box>

        <Information
          name="tuition fee"
          value={
            <>
              {tuitionFeeAmount.toLocaleString()} <sup>{tuitionFeeUnit}</sup>
            </>
          }
        />
        <Information name="educational level" value={educationalLevel} />
        {educationalGrade && (
          <Information name="educational grade" value={educationalGrade} />
        )}

        <Information
          name="schedule"
          value={
            <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Text>{getDateString(course.startDate)}</Text>
              <BsArrowRightShort />
              <Text>{getDateString(course.endDate)}</Text>
            </Box>
          }
        />

        <Information
          name="time"
          value={
            <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Text>{startAt}</Text>
              <BsArrowRightShort />
              <Text>{endAt}</Text>
            </Box>
          }
        />

        <Information
          name="learning days"
          value={learningDays?.split(',')?.join(', ')}
        />
      </Box>
    </motion.div>
  );
}

type InformationProps = {
  name: string;
  value: React.ReactElement | string | number;
};

function Information({ name, value }: InformationProps) {
  return (
    <Grid>
      <Grid.Col span={4}>
        <Text>{name}</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Text>{value}</Text>
      </Grid.Col>
    </Grid>
  );
}
