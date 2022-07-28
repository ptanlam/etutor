import { motion } from 'framer-motion';

import {
  Affix,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
  Transition,
} from '@mantine/core';

import { useAppSelector } from '../../../../app/hooks';
import { CardViewWithImage } from '../../../../components/CardViewWithImage';
import { ProtectedComponent } from '../../../../components/ProtectedComponent';
import { placeholderImage } from '../../../../constants/shared';
import {
  Certificate,
  Degree,
  TutorDetails as TutorDetailsModel,
} from '../../../../models/tutor';
import { FeedbackListManagement } from '../../../feedbackList/pages/FeedbackListManagement';
import { tutorDetailsSelector } from '../../../tutor/tutorSlice';
import styles from './TutorDetails.module.css';

type Props = {
  tutor: TutorDetailsModel;
  openBookingForm: () => void;
  bookingFormOpened: boolean;
};

export function TutorDetails({
  tutor,
  openBookingForm,
  bookingFormOpened,
}: Props) {
  const { id: tutorId } = useAppSelector(tutorDetailsSelector);

  const {
    id,
    firstName,
    lastName,
    images,
    gender,
    email,
    degrees,
    certificates,
    rentalAmount,
    rentalUnit,
  } = tutor;

  const isTutorThemselves = tutorId === id;

  return (
    <>
      <Container size="xl" className={styles.container}>
        <SimpleGrid cols={2} spacing={32}>
          <motion.div initial={{ y: 10 }} animate={{ y: 0 }}>
            <Image radius={12} src={images.at(0)?.url || placeholderImage} />
          </motion.div>

          <Box className={styles.informationContainer}>
            <Box>
              <Text color="dimmed">{email}</Text>
              <Title
                order={1}
                className={styles.title}
              >{`${firstName} ${lastName}`}</Title>
            </Box>

            <Box>
              <Badge>{gender}</Badge>
            </Box>

            <Box className={styles.listContainer}>
              <Title order={4} className={styles.title}>
                Degrees
              </Title>
              {degrees.map((degree) => (
                <DegreeCardView key={degree.id} degree={degree} />
              ))}
            </Box>

            <Box className={styles.listContainer}>
              <Title order={4} className={styles.title}>
                Certificates
              </Title>
              {certificates.map((certificate) => (
                <CertificateCardView
                  key={certificate.id}
                  certificate={certificate}
                />
              ))}
            </Box>

            <Box className={styles.listContainer}>
              <Title order={4} className={styles.title}>
                Feedbacks
              </Title>
              <FeedbackListManagement topicId={id} />
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      <Transition transition="slide-up" mounted={!bookingFormOpened}>
        {(transitionStyles) => (
          <Affix
            style={transitionStyles}
            position={{ left: '25%', right: '25%', bottom: 40 }}
          >
            <Box className={styles.bookingButton}>
              <Box
                style={{
                  flex: 1,
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                <Avatar src={images?.[0]?.url} size="lg" />
                <Text style={{ fontWeight: 500 }}>
                  {firstName} {lastName}
                </Text>
              </Box>

              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <Title order={3} style={{ fontWeight: 400 }}>
                  {rentalAmount.toLocaleString()} {rentalUnit} / hr
                </Title>
                {!isTutorThemselves && (
                  <ProtectedComponent>
                    <Button onClick={openBookingForm}>Book tutor</Button>
                  </ProtectedComponent>
                )}
              </Box>
            </Box>
          </Affix>
        )}
      </Transition>
    </>
  );
}

type DegreeCardViewProps = { degree: Degree };

function DegreeCardView({ degree }: DegreeCardViewProps) {
  const { name, major, dateOfIssue, graduatedUniversity, academicRank, image } =
    degree;

  return (
    <CardViewWithImage imageString={image?.url} style={{ background: 'white' }}>
      <SimpleGrid cols={2}>
        <Text>Name</Text>
        <Text>{name}</Text>
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Text>Major</Text>
        <Text>{major}</Text>
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Text>Academic rank</Text>
        <Text>{academicRank}</Text>
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Text>Date of issue</Text>
        <Text>{new Date(dateOfIssue).toLocaleDateString()}</Text>
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Text>University</Text>
        <Text>{graduatedUniversity}</Text>
      </SimpleGrid>
    </CardViewWithImage>
  );
}

function CertificateCardView({ certificate }: { certificate: Certificate }) {
  const { name, placeOfIssue, dateOfIssue, expiresIn, image } = certificate;

  return (
    <CardViewWithImage imageString={image?.url} style={{ background: 'white' }}>
      <SimpleGrid cols={2}>
        <Text>Name</Text>
        <Text>{name}</Text>
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Text>Place of issue</Text>
        <Text>{placeOfIssue}</Text>
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Text>Date of issue</Text>
        <Text>{new Date(dateOfIssue).toLocaleDateString()}</Text>
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Text>Expires in</Text>
        <Text>{new Date(expiresIn).toLocaleDateString()}</Text>
      </SimpleGrid>
    </CardViewWithImage>
  );
}
