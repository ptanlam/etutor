import { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, SegmentedControl, SimpleGrid, Text, Title } from '@mantine/core';

import { useAppSelector } from '../../../../app/hooks';
import { ErrorIndicator } from '../../../../components/ErrorIndicator';
import { courseDetailSections } from '../../../../constants/features/courseList/components/CourseDetails';
import { placeholderImage } from '../../../../constants/shared';
import { ApplicationContext } from '../../../../contexts';
import { CourseDetails as CourseDetailsModel } from '../../../../models/course';
import { getDateString } from '../../../../utils';
import { FeedbackListManagement } from '../../../feedbackList/pages/FeedbackListManagement';
import { userDetailsSelector } from '../../../user/userSlice';
import styles from './CourseDetails.module.css';

type Props = {
  details: CourseDetailsModel;
};

export function CourseDetails({ details }: Props) {
  const { enrollmentsService } = useContext(ApplicationContext);

  const [section, setSection] = useState(courseDetailSections[0].value);

  const { isAuthenticated } = useAuth0();
  const { id: userId } = useAppSelector(userDetailsSelector);
  const { data: alreadyEnrolledThisCourse } = useQuery(
    ['courses', details.id, 'users', userId, 'enrollment'],
    async () => {
      const enrollment = await enrollmentsService.getForCourseAndStudent(
        details.id,
        userId,
      );

      return !!enrollment;
    },
    { enabled: !!userId },
  );

  // TODO: load feedback list, syllabi
  const {
    startDate,
    endDate,
    tuitionFeeAmount,
    tuitionFeeUnit,
    learningDays,
    startAt,
    endAt,
    name,
    description,
    maxNumberOfStudents,
    educationalLevel,
    educationalGrade,
    tutor,
    thumbnail,
  } = details;

  const renderSection = () => {
    switch (section) {
      case courseDetailSections[1].value:
        return (
          <FeedbackListManagement
            topicId={details.id}
            canPost={isAuthenticated && alreadyEnrolledThisCourse}
          />
        );

      case courseDetailSections[2].value:
        return (
          <Information
            startDate={startDate}
            endDate={endDate}
            learningDays={learningDays}
            startAt={startAt}
            endAt={endAt}
            tuitionFeeAmount={tuitionFeeAmount}
            tuitionFeeUnit={tuitionFeeUnit}
            maxNumberOfStudents={maxNumberOfStudents}
            educationalLevel={educationalLevel}
            educationalGrade={educationalGrade}
          />
        );

      default:
        return <ErrorIndicator />;
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.metadataContainer}>
        <Box
          className={styles.banner}
          style={{
            backgroundImage: `url(${thumbnail?.url || placeholderImage})`,
          }}
        />
        <Box className={styles.metadata}>
          <Title className={styles.courseName}>{name}</Title>
          <Text className={styles.text}>
            by {tutor.firstName} {tutor.lastName}
          </Text>
          <Text className={styles.text}>{description}</Text>
        </Box>
      </Box>

      <Box className={styles.contentContainer}>
        <SegmentedControl
          fullWidth
          color="dark"
          radius="lg"
          value={section}
          onChange={setSection}
          data={courseDetailSections}
          transitionDuration={500}
          transitionTimingFunction="linear"
          size="md"
        />

        <Box className={styles.content}>{renderSection()}</Box>
      </Box>
    </Box>
  );
}

type InformationProps = Pick<
  CourseDetailsModel,
  | 'startDate'
  | 'endDate'
  | 'learningDays'
  | 'startAt'
  | 'endAt'
  | 'tuitionFeeAmount'
  | 'tuitionFeeUnit'
  | 'maxNumberOfStudents'
  | 'educationalLevel'
  | 'educationalGrade'
>;

function Information({
  startDate,
  endDate,
  learningDays,
  startAt,
  endAt,
  tuitionFeeAmount,
  tuitionFeeUnit,
  maxNumberOfStudents,
  educationalLevel,
  educationalGrade,
}: InformationProps) {
  return (
    <>
      <SimpleGrid cols={2}>
        <Text>Start date</Text>
        <Text>{getDateString(startDate)}</Text>
      </SimpleGrid>

      <SimpleGrid cols={2}>
        <Text>End date</Text>
        <Text>{getDateString(endDate)}</Text>
      </SimpleGrid>

      <SimpleGrid cols={2}>
        <Text>Learning days</Text>
        <Text>{learningDays?.split(',')?.join(', ')}</Text>
      </SimpleGrid>

      <SimpleGrid cols={2}>
        <Text>Start at</Text>
        <Text>{startAt}</Text>
      </SimpleGrid>

      <SimpleGrid cols={2}>
        <Text>End at</Text>
        <Text>{endAt}</Text>
      </SimpleGrid>

      <SimpleGrid cols={2}>
        <Text>Tuition fee</Text>
        <Text>
          {tuitionFeeAmount.toLocaleString()} <sup>{tuitionFeeUnit}</sup>
        </Text>
      </SimpleGrid>

      <SimpleGrid cols={2}>
        <Text>Quantity</Text>
        <Text>{maxNumberOfStudents}</Text>
      </SimpleGrid>

      <SimpleGrid cols={2}>
        <Text>Educational level</Text>
        <Text>{educationalLevel}</Text>
      </SimpleGrid>

      <SimpleGrid cols={2}>
        <Text>Educational grade</Text>
        <Text>{educationalGrade}</Text>
      </SimpleGrid>
    </>
  );
}
