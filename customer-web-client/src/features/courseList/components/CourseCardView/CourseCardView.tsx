import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';

import { Avatar, Badge, Box, Button, Text, Title } from '@mantine/core';

import { useAppSelector } from '../../../../app/hooks';
import { ProtectedComponent } from '../../../../components/ProtectedComponent';
import { placeholderImage } from '../../../../constants/shared';
import { ApplicationContext } from '../../../../contexts';
import { OnlineCourse } from '../../../../models/course';
import {
  getDateString,
  getRandomColorScheme,
  getTimeFromDate,
} from '../../../../utils';
import { tutorDetailsSelector } from '../../../tutor/tutorSlice';
import { userDetailsSelector } from '../../../user/userSlice';
import styles from './CourseList.module.css';

type CardProps = {
  course: OnlineCourse;
  onEnroll: (course: OnlineCourse) => void;
};

export function CourseCardView({ course, onEnroll: enroll }: CardProps) {
  const { enrollmentsService } = useContext(ApplicationContext);

  const { id: userId } = useAppSelector(userDetailsSelector);
  const { id: tutorId } = useAppSelector(tutorDetailsSelector);

  const { data: alreadyEnrolledThisCourse } = useQuery(
    ['courses', course.id, 'users', userId, 'enrollment'],
    async () => {
      const enrollment = await enrollmentsService.getForCourseAndStudent(
        course.id,
        userId,
      );

      return !!enrollment;
    },
    { enabled: !!userId },
  );

  const {
    id,
    name,
    description,
    subjectName,
    startDate,
    endDate,
    learningDays,
    educationalLevel,
    educationalGrade,
    tuitionFeeAmount,
    tuitionFeeUnit,
    tutor,
    thumbnail,
    numberOfEnrollments,
    maxNumberOfStudents,
  } = course;

  const remainingSlots = maxNumberOfStudents - numberOfEnrollments;
  const isTheirOwnCourse = tutor.id === tutorId;

  const onEnroll = () => () => enroll(course);

  return (
    <motion.div whileHover={{ y: -4 }} className={styles.cardContainer}>
      <Box
        style={{
          backgroundImage: `url(${
            thumbnail ? thumbnail.url : placeholderImage
          })`,
        }}
        className={styles.thumbnail}
      >
        <Text className={styles.tuition}>
          {tuitionFeeAmount.toLocaleString()} <sup>{tuitionFeeUnit}</sup>
        </Text>

        <NavLink to={`/tutors/${tutor.id}`}>
          <Box className={styles.tutorContainer}>
            <Avatar
              radius="xl"
              size="lg"
              src={`url(${tutor.images?.[0]?.url || placeholderImage})`}
              className={styles.tutorAvatar}
            />
            <Text className={styles.tutorName}>
              {tutor.firstName} {tutor.lastName}
            </Text>
          </Box>
        </NavLink>
      </Box>

      <Box className={styles.body}>
        <Box>
          <NavLink to={`/courses/${id}`}>
            <Title className={styles.name}>{name}</Title>
          </NavLink>
          <Text className={styles.subjectName}>{subjectName}</Text>
        </Box>

        <Box className={styles.badgeContainer}>
          <Badge color={getRandomColorScheme()}>{educationalLevel}</Badge>
          {educationalGrade && (
            <Badge color={getRandomColorScheme()}>{educationalGrade}</Badge>
          )}
        </Box>

        <Box>
          <Text className={styles.date}>
            From {getDateString(startDate)} &bull; To {getDateString(endDate)}
          </Text>

          <Text className={styles.time}>
            {getTimeFromDate(new Date(startDate))} &bull;{' '}
            {getTimeFromDate(new Date(endDate))}
          </Text>
        </Box>

        <Text className={styles.description}>{description}</Text>

        <Text className={styles.learningDays}>
          {learningDays?.split(',')?.join(' | ')}
        </Text>

        <Text>{remainingSlots} slots remaining</Text>

        <ProtectedComponent
          disabledComponent={
            <Button disabled style={{ width: '100%' }}>
              Login to enroll
            </Button>
          }
        >
          {!isTheirOwnCourse && (
            <Button
              color="green"
              onClick={onEnroll()}
              disabled={alreadyEnrolledThisCourse}
            >
              {`Enroll${alreadyEnrolledThisCourse ? 'ed' : ''}`}
            </Button>
          )}
        </ProtectedComponent>
      </Box>
    </motion.div>
  );
}
