import htmlParse from 'html-react-parser';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import { Avatar, Box, Container, Text } from '@mantine/core';

import { tutorProfileSections } from '../../../../constants/features/tutor/components/TutorProfile';
import { placeholderImage } from '../../../../constants/shared';
import { getAge, getDateString } from '../../../../utils';
import { tutorDetailsSelector } from '../../tutorSlice';
import styles from './TutorProfile.module.css';

type Props = {
  chosenSection: number;
  setChosenSection: (section: { name: string; value: number }) => void;
};

export function TutorProfile({
  chosenSection,
  setChosenSection,
  children,
}: PropsWithChildren<Props>) {
  const {
    firstName,
    lastName,
    description,
    email,
    gender,
    dateOfBirth,
    phoneNumber,
    createdAt,
    images,
  } = useSelector(tutorDetailsSelector);

  return (
    <Container size="lg" className={styles.container}>
      <Box className={styles.leftContainer}>
        <Box className={styles.metadata}>
          <Avatar
            size={150}
            className={styles.avatar}
            src={images.length ? images[0].url : placeholderImage}
          />
          <Text className={styles.name}>
            {firstName} {lastName}
          </Text>
        </Box>

        <Box className={styles.sectionContainer}>
          {React.Children.toArray(
            tutorProfileSections.map(({ name, value }) => (
              <Text
                color={value === chosenSection ? 'var(--gray-800)' : 'dimmed'}
                ml={value === chosenSection ? 8 : 0}
                onClick={() => setChosenSection({ name, value })}
              >
                {name}
              </Text>
            ))
          )}
        </Box>
      </Box>

      <Box className={styles.centerContainer}>{children}</Box>

      <Box className={styles.rightContainer}>
        <Information name="description" value={htmlParse(description)} />
        <Information name="gender" value={gender} />
        <Information name="age" value={getAge(dateOfBirth)} />
        <Information name="email" value={email} />
        <Information name="phone" value={phoneNumber} />
        <Information name="joined at" value={getDateString(createdAt)} />
      </Box>
    </Container>
  );
}

type InformationProps = {
  name: string;
  value: string | number | JSX.Element[] | JSX.Element;
};

function Information({ name, value }: InformationProps) {
  return (
    <Box className={styles.informationContainer}>
      <Text size="lg" color="dimmed">
        {name}
      </Text>
      <Text align="justify">{value}</Text>
    </Box>
  );
}
