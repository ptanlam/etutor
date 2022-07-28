import { motion } from 'framer-motion';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';

import { getDateString } from '../../../../utils';
import { userDetailsSelector } from '../../userSlice';
import styles from './UserProfile.module.css';

type Props = {
  openUpdateForm: () => void;
};

export function UserProfile({ openUpdateForm }: Props) {
  const {
    avatarUrl,
    firstName,
    lastName,
    email,
    phoneNumber,
    fullName,
    gender,
    dateOfBirth,
  } = useSelector(userDetailsSelector);

  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      className={styles.pageContainer}
    >
      <Box className={styles.container}>
        <Box className={styles.leftContainer}>
          <Avatar src={avatarUrl} size={80} className={styles.avatar} />
          <Text className={styles.name}>
            {firstName} {lastName}
          </Text>
        </Box>
        <Box className={styles.rightContainer}>
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ActionIcon onClick={() => openUpdateForm()}>
              <FiEdit />
            </ActionIcon>
          </Box>

          <Box className={styles.sectionContainer}>
            <Box>
              <Title order={4}>Contact</Title>
              <Divider />
            </Box>
            <SimpleGrid cols={1} spacing="lg">
              <Information label="Email" value={email} />
              <Information label="Phone" value={phoneNumber} />
            </SimpleGrid>
          </Box>

          <Box className={styles.sectionContainer}>
            <Box>
              <Title order={4}>Information</Title>
              <Divider />
            </Box>
            <Information label="Full name" value={fullName} />
            <SimpleGrid cols={2} spacing="lg">
              <Information label="First name" value={firstName} />
              <Information label="Last name" value={lastName} />
              <Information label="Gender" value={gender} />
              <Information
                label="Date of birth"
                value={getDateString(dateOfBirth)}
              />
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

type InformationProps = { label: string; value: string };

function Information({ label, value }: InformationProps) {
  return (
    <Box className={styles.informationContainer}>
      <Text size="md">{label}</Text>
      <Text color="dimmed">{value}</Text>
    </Box>
  );
}
