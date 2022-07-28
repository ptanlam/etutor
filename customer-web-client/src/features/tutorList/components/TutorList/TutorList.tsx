import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, Text, Title } from '@mantine/core';

import { useAppSelector } from '../../../../app/hooks';
import { ProtectedComponent } from '../../../../components/ProtectedComponent';
import { placeholderImage } from '../../../../constants/shared';
import { Tutor } from '../../../../models/tutor';
import { getAge } from '../../../../utils';
import { tutorDetailsSelector } from '../../../tutor/tutorSlice';
import { TutorListContext } from '../../contexts';
import styles from './TutorList.module.css';

type Props = { list: Tutor[] };

export function TutorList({ list }: Props) {
  return (
    <motion.div
      className={styles.container}
      variants={{ start: {}, end: { transition: { staggerChildren: 0.2 } } }}
      initial="start"
      animate="end"
    >
      <AnimatePresence>
        {list.map((tutor, index) => (
          <motion.div
            key={tutor.id}
            variants={{
              start: { x: index ? '100%' : '-100%' },
              end: { x: 0 },
            }}
          >
            <TutorCardView tutor={tutor} isEvenPosition={index % 2 === 0} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

type TutorCardViewProps = { tutor: Tutor; isEvenPosition: boolean };

function TutorCardView({ tutor, isEvenPosition }: TutorCardViewProps) {
  const { bookTutor } = useContext(TutorListContext);
  const navigate = useNavigate();

  const { id: tutorId } = useAppSelector(tutorDetailsSelector);

  const {
    id,
    fullName,
    gender,
    dateOfBirth,
    images,
    rentalAmount,
    rentalUnit,
  } = tutor;

  const isTutorThemselves = tutorId === id;

  const onDetailsClick = () => {
    navigate(`/tutors/${id}`);
  };

  return (
    <Box
      className={styles.cardContainer}
      style={{ flexDirection: isEvenPosition ? 'row' : 'row-reverse' }}
    >
      <Box style={{ padding: 0 }} className={styles.cardLeftContainer}>
        <motion.div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            cursor: 'pointer',
          }}
          whileHover={{ top: -4 }}
        >
          <motion.div
            className={styles.thumbnail}
            onClick={onDetailsClick}
            style={{
              ...(isEvenPosition
                ? {
                    borderStartStartRadius: '24px',
                    borderEndStartRadius: '24px',
                  }
                : { borderStartEndRadius: '24px', borderEndEndRadius: '24px' }),
              backgroundImage: `url(${images?.[0]?.url || placeholderImage})`,
            }}
          />
        </motion.div>
      </Box>

      <Box
        className={styles.cardRightContainer}
        style={{
          ...(isEvenPosition
            ? { borderStartEndRadius: '24px', borderEndEndRadius: '24px' }
            : { borderStartStartRadius: '24px', borderEndStartRadius: '24px' }),
        }}
      >
        <Box style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Title order={2} style={{ fontWeight: 900 }}>
            {fullName}
          </Title>

          <Box className={styles.cardInformationContainer}>
            <Information label="Gender" value={gender} />
            <Information label="Age" value={getAge(dateOfBirth)} />
            <Information
              label="Rental"
              value={`${rentalAmount.toLocaleString()} ${rentalUnit} / hr`}
            />
          </Box>
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ProtectedComponent
            disabledComponent={<Button disabled>Select schedule</Button>}
          >
            {!isTutorThemselves && (
              <Button
                variant="gradient"
                radius="lg"
                gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                onClick={() => bookTutor(tutor)}
              >
                Select schedule
              </Button>
            )}
          </ProtectedComponent>
        </Box>
      </Box>
    </Box>
  );
}

type InformationProps = { label: string; value: string | number };

function Information({ label, value }: InformationProps) {
  return (
    <Grid columns={10} align="center" style={{ flex: 1 }}>
      <Grid.Col span={3}>
        <Text size="lg" color="dimmed">
          {label}
        </Text>
      </Grid.Col>
      <Grid.Col span={7}>
        <Text size="lg">{value}</Text>
      </Grid.Col>
    </Grid>
  );
}
