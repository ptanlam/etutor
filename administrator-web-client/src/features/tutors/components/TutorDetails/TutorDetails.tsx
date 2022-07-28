import { PropsWithChildren } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

import {
  Certificate,
  Degree,
  TutorDetails as TutorDetailsModel,
} from '../../../../models/tutor';
import { getDateString } from '../../../../utils';

type Props = { details: TutorDetailsModel };

export function TutorDetails({
  details: {
    firstName,
    lastName,
    fullName,
    description,
    gender,
    dateOfBirth,
    email,
    phoneNumber,
    rentalAmount,
    rentalUnit,
    images,
    degrees,
    certificates,
  },
}: Props) {
  return (
    <Box display="flex" flexDir="column" gap={4}>
      <Box display="flex" justifyContent="center">
        <Avatar size="xl" src={images?.[0]?.url} />
      </Box>

      <Heading fontWeight={900}>
        {firstName} {lastName}
      </Heading>

      <Text>{description}</Text>

      <Box display="flex" gap={2} alignItems="center">
        <Badge colorScheme="yellow">{gender}</Badge>
        <Badge colorScheme="blue">{getDateString(dateOfBirth)}</Badge>
      </Box>

      <Box>
        <Information label="Full name" value={fullName} />
        <Information label="Email" value={email} />
        <Information label="Phone number" value={phoneNumber} />
        <Information
          label="Rental"
          value={`${rentalAmount.toLocaleString()} ${rentalUnit || 'N/A'}`}
        />
      </Box>

      <Accordion>
        <AccordionWrapper section="Degrees">
          {degrees.map((degree) => (
            <DegreeCardView key={degree.id} degree={degree} />
          ))}
        </AccordionWrapper>

        <AccordionWrapper section="Certificates">
          {certificates.map((certificate) => (
            <CertificateCardView
              key={certificate.id}
              certificate={certificate}
            />
          ))}
        </AccordionWrapper>
      </Accordion>
    </Box>
  );
}

function AccordionWrapper({
  section,
  children,
}: PropsWithChildren<{ section: string }>) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {section}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>

      <AccordionPanel display="flex" flexDir="column" gap={8}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
}

function DegreeCardView({ degree }: { degree: Degree }) {
  const { name, academicRank, dateOfIssue, graduatedUniversity, major, image } =
    degree;

  const spans = { labelSpan: 5, valueSpan: 7 };

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={12}>
      <GridItem colSpan={4}>
        <Image src={image?.url} />
      </GridItem>

      <GridItem colSpan={8}>
        <Information {...spans} label="Name" value={name} />
        <Information {...spans} label="Major" value={major} />
        <Information {...spans} label="Academic rank" value={academicRank} />
        <Information
          {...spans}
          label="University"
          value={graduatedUniversity}
        />
        <Information
          {...spans}
          label="Date of issue"
          value={getDateString(dateOfIssue)}
        />
      </GridItem>
    </Grid>
  );
}

function CertificateCardView({ certificate }: { certificate: Certificate }) {
  const { name, placeOfIssue, dateOfIssue, expiresIn, image } = certificate;

  const spans = { labelSpan: 5, valueSpan: 7 };

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={12}>
      <GridItem colSpan={4}>
        <Image src={image?.url} />
      </GridItem>

      <GridItem colSpan={8}>
        <Information {...spans} label="Name" value={name} />
        <Information {...spans} label="Place of issue" value={placeOfIssue} />
        <Information
          {...spans}
          label="Expiry date"
          value={getDateString(expiresIn)}
        />
        <Information
          {...spans}
          label="Date of issue"
          value={getDateString(dateOfIssue)}
        />
      </GridItem>
    </Grid>
  );
}

function Information({
  label,
  value,
  labelSpan,
  valueSpan,
}: {
  label: string;
  value: string;
  labelSpan?: number;
  valueSpan?: number;
}) {
  return (
    <Grid templateColumns="repeat(12, 1fr)">
      <GridItem colSpan={labelSpan ?? 4}>{label}:</GridItem>
      <GridItem colSpan={valueSpan ?? 8}>{value}</GridItem>
    </Grid>
  );
}
