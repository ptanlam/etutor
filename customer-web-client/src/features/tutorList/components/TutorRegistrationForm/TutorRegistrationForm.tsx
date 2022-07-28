import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Container,
  SimpleGrid,
  Stepper,
  Text,
  Textarea,
  Title,
} from '@mantine/core';

import { termsAndConditions } from '../../../../constants/features/tutorList/components/TutorRegistrationForm/termsAndConditions';
import { TutorRegistrationDto } from '../../../../shared/dtos/tutor';
import { StepType } from '../../../../shared/enums';
import { VisibilityProps } from '../../../../shared/props';
import { useTutorRegistrationDto } from '../../hooks';
import { CertificateListCreationForm } from '../CertificateListCreationForm';
import { DegreeListCreationForm } from '../DegreeListCreationForm';
import { SubjectListCreationForm } from '../SubjectListCreationForm';
import { TutorRegistrationConfirmationForm } from '../TutorRegistrationConfirmationForm';
import styles from './TutorRegistrationForm.module.css';

export function TutorRegistrationForm() {
  const [step, setStep] = useState(0);

  const onStepChange = (stepType: StepType) =>
    setStep(step + (stepType === StepType.Forward ? 1 : -1));

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <AgreementForm
            key={0}
            isVisible={step === 0}
            onStepChange={onStepChange}
          />
        );

      case 1:
        return (
          <DescriptionForm
            key={1}
            isVisible={step === 1}
            onStepChange={onStepChange}
          />
        );

      case 2:
        return (
          <SubjectListCreationForm
            key={2}
            isVisible={step === 2}
            onStepChange={onStepChange}
          />
        );

      case 3:
        return (
          <DegreeListCreationForm
            key={3}
            isVisible={step === 3}
            onStepChange={onStepChange}
          />
        );

      case 4:
        return (
          <CertificateListCreationForm
            key={4}
            isVisible={step === 4}
            onStepChange={onStepChange}
          />
        );

      case 5:
        return (
          <TutorRegistrationConfirmationForm key={5} isVisible={step === 5} />
        );

      default:
        break;
    }
  };

  return (
    <Container size="xl" className={styles.container}>
      <Stepper active={step}>
        <Stepper.Step label="Fist step" description="Terms and conditions" />
        <Stepper.Step label="Second step" description="Description" />
        <Stepper.Step label="Third step" description="Add subjects" />
        <Stepper.Step label="Forth step" description="Add degrees" />
        <Stepper.Step label="Fifth step" description="Add certificates" />
        <Stepper.Step label="Final step" description="Confirmation" />
      </Stepper>

      <Container
        style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AnimatePresence exitBeforeEnter>{renderForm()}</AnimatePresence>
      </Container>
    </Container>
  );
}

type AgreementFormProps = VisibilityProps & {
  onStepChange: (stepType: StepType) => void;
};

function AgreementForm({ isVisible, onStepChange }: AgreementFormProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      {isVisible && (
        <motion.div
          className={styles.agreementContainer}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SimpleGrid cols={1} spacing={16} className={styles.agreementContent}>
            {React.Children.toArray(
              termsAndConditions.map(({ heading, content }) => (
                <>
                  <Title order={3}>{heading}</Title>
                  <Text>{content}</Text>
                </>
              )),
            )}
          </SimpleGrid>

          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Checkbox
              label="I agree with the terms and conditions"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <Button
              disabled={!agreed}
              onClick={() => onStepChange(StepType.Forward)}
            >
              next
            </Button>
          </Box>
        </motion.div>
      )}
    </>
  );
}

const descriptionSchema = yup.object({
  description: yup.string().max(250).required(),
});

type DescriptionFormProps = VisibilityProps & {
  onStepChange: (stepType: StepType) => void;
};

function DescriptionForm({ isVisible, onStepChange }: DescriptionFormProps) {
  const { handleSubmit, register } = useForm<
    Pick<TutorRegistrationDto, 'description'>
  >({
    resolver: yupResolver(descriptionSchema),
  });

  const { setDescription } = useTutorRegistrationDto();

  return (
    <>
      {isVisible && (
        <motion.form
          className={styles.descriptionContainer}
          onSubmit={handleSubmit(setDescription)}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ActionIcon radius="xl">
              <IoIosArrowDropleftCircle
                fontSize="1.5rem"
                onClick={() => onStepChange(StepType.Backward)}
              />
            </ActionIcon>

            <Title order={3}>Description</Title>

            <ActionIcon
              type="submit"
              radius="xl"
              onClick={() => onStepChange(StepType.Forward)}
            >
              <IoIosArrowDroprightCircle fontSize="1.5rem" />
            </ActionIcon>
          </Box>

          <Textarea {...register('description')} size="lg" minRows={10} />
        </motion.form>
      )}
    </>
  );
}
