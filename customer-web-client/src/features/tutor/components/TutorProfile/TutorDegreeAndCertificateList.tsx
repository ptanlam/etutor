import React, { PropsWithChildren } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { ActionIcon, Box, Grid, Text } from '@mantine/core';

import { placeholderImage } from '../../../../constants/shared';
import { Certificate, Degree } from '../../../../models/tutor';
import { getDateString } from '../../../../utils';
import { tutorDetailsSelector } from '../../tutorSlice';
import styles from './TutorDegreeAndCertificateList.module.css';

type Props<T extends Degree | Certificate> = { openForm: (payload: T) => void };

export function TutorDegreeList({ openForm }: Props<Degree>) {
  const { degrees } = useSelector(tutorDetailsSelector);

  return (
    <Box className={styles.listContainer}>
      {degrees.map((degree) => (
        <DegreeCardView degree={degree} openForm={openForm} key={degree.id} />
      ))}
    </Box>
  );
}

type DegreeCardViewProps = Pick<Props<Degree>, 'openForm'> & { degree: Degree };

function DegreeCardView({ degree, openForm }: DegreeCardViewProps) {
  const { academicRank, dateOfIssue, graduatedUniversity, major, name } =
    degree;

  return (
    <CardViewWrapper<Degree> onEditClick={openForm} payload={degree}>
      <Information name="name" value={name} />
      <Information name="major" value={major} />
      <Information name="university" value={graduatedUniversity} />
      <Information name="academic rank" value={academicRank} />
      <Information name="date of issue" value={getDateString(dateOfIssue)} />
    </CardViewWrapper>
  );
}

export function TutorCertificateList({ openForm }: Props<Certificate>) {
  const { certificates } = useSelector(tutorDetailsSelector);

  return (
    <Box className={styles.listContainer}>
      {certificates.map((certificate) => (
        <CertificateCardView
          certificate={certificate}
          openForm={openForm}
          key={certificate.id}
        />
      ))}
    </Box>
  );
}

type CertificateCardViewProps = Pick<Props<Certificate>, 'openForm'> & {
  certificate: Certificate;
};

function CertificateCardView({
  certificate,
  openForm,
}: CertificateCardViewProps) {
  const { name, placeOfIssue, dateOfIssue, expiresIn } = certificate;

  return (
    <CardViewWrapper<Certificate> onEditClick={openForm} payload={certificate}>
      <Information name="name" value={name} />
      <Information name="place of issue" value={placeOfIssue} />
      <Information name="expires in" value={getDateString(expiresIn)} />
      <Information name="date of issue" value={getDateString(dateOfIssue)} />
    </CardViewWrapper>
  );
}

type CardViewWrapperProps<T extends Degree | Certificate> = {
  onEditClick: (payload: T) => void;
  payload: T;
};

function CardViewWrapper<T extends Degree | Certificate>({
  children,
  onEditClick,
  payload,
}: PropsWithChildren<CardViewWrapperProps<T>>) {
  return (
    <Grid className={styles.cardViewContainer}>
      <Grid.Col span={4} style={{ display: 'flex' }}>
        <Box
          className={styles.image}
          style={{
            // TODO: get image
            backgroundImage: `url('${
              payload?.image?.url ?? placeholderImage
            }')`,
          }}
        />
      </Grid.Col>

      <Grid.Col span={8} className={styles.contentContainer}>
        <Grid>
          <Grid.Col span={12}>
            <Box className={styles.actionContainer}>
              <ActionIcon onClick={() => onEditClick(payload)}>
                <FiEdit color="var(--blue-700)" />
              </ActionIcon>
              <ActionIcon>
                <FiTrash2 color="var(--red-700)" />
              </ActionIcon>
            </Box>
          </Grid.Col>

          <Grid.Col span={12}>{children}</Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}

type InformationProps = { name: string; value: string | number };

function Information({ name, value }: InformationProps) {
  return (
    <Grid gutter={4}>
      <Grid.Col span={5}>
        <Text color="dimmed">{name}</Text>
      </Grid.Col>
      <Grid.Col span={5}>
        <Text>{value}</Text>
      </Grid.Col>
    </Grid>
  );
}
