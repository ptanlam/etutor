import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { Box, Button, Modal } from '@mantine/core';

import { ErrorIndicator } from '../../../../components/ErrorIndicator';
import { Wrapper } from '../../../../components/Wrapper';
import { tutorProfileSections } from '../../../../constants/features/tutor/components/TutorProfile';
import { ApplicationContext } from '../../../../contexts';
import { Subject } from '../../../../models/course';
import { Certificate, Degree } from '../../../../models/tutor';
import { TutorCertificateManipulatingForm } from '../../components/TutorCertificateManipulatingForm';
import { TutorDegreeManipulatingForm } from '../../components/TutorDegreeManipulatingForm';
import { TutorProfile } from '../../components/TutorProfile';
import {
  TutorCertificateList,
  TutorDegreeList,
} from '../../components/TutorProfile/TutorDegreeAndCertificateList';
import { TutorSubjectList } from '../../components/TutorSubjectList';
import { TutorSubjectManipulatingForm } from '../../components/TutorSubjectManipulatingForm';
import { tutorDetailsSelector } from '../../tutorSlice';
import styles from './TutorProfileManagement.module.css';

export function TutorProfileManagement() {
  const { coursesService, constantsService } = useContext(ApplicationContext);

  const tutor = useSelector(tutorDetailsSelector);

  const [chosenSection, setChosenSection] = useState(tutorProfileSections[0]);
  const [chosenEducationalLevelId, setChosenEducationalLevelId] = useState('');
  const [manipulatingForm, setManipulatingForm] = useState<{
    opened: boolean;
    payload: Subject | Degree | Certificate | null;
  }>({ opened: false, payload: null });

  const {
    data: subjectList,
    isLoading,
    isError,
  } = useQuery(['tutors', tutor.id, 'subjects'], ({ signal }) =>
    coursesService.getSubjectListForTutor(tutor.id, signal)
  );

  const { data: educationalLevelList } = useQuery('educationalLevels', () =>
    constantsService.getEducationalLevelList()
  );

  const { data: educationalGradeList } = useQuery(
    ['educationalLevels', chosenEducationalLevelId, 'educationalGrades'],
    () => constantsService.getEducationalGradeList(chosenEducationalLevelId!),
    { enabled: !!chosenEducationalLevelId }
  );

  const { data: academicRankList } = useQuery('academicRanks', () =>
    constantsService.getAcademicRankList()
  );

  const renderSectionText = () =>
    chosenSection.name
      .slice(0, chosenSection.name.length - 1)
      .toLocaleLowerCase();

  const openManipulatingForm = (
    payload: Subject | Degree | Certificate | null
  ) => {
    setManipulatingForm((prev) => ({ ...prev, opened: true, payload }));
  };

  const closeManipulatingForm = () => {
    setManipulatingForm((prev) => ({ ...prev, opened: false, payload: null }));
  };

  const renderSection = () => {
    switch (chosenSection.value) {
      case 1:
        return (
          <Wrapper<Subject[]>
            type="component"
            data={subjectList}
            loading={isLoading}
            hasError={isError}
          >
            <TutorSubjectList
              list={subjectList!}
              openForm={openManipulatingForm}
            />
          </Wrapper>
        );

      case 2:
        return <TutorDegreeList openForm={openManipulatingForm} />;

      case 3:
        return <TutorCertificateList openForm={openManipulatingForm} />;

      default:
        return <ErrorIndicator />;
    }
  };

  const renderForm = () => {
    switch (chosenSection.value) {
      case 1:
        const subject = manipulatingForm.payload as Subject | undefined;

        return (
          <TutorSubjectManipulatingForm
            tutorId={tutor.id}
            educationalLevelList={educationalLevelList || []}
            educationalGradeList={educationalGradeList || []}
            onEducationalLevelChange={setChosenEducationalLevelId}
            onClose={closeManipulatingForm}
            subject={subject}
          />
        );

      case 2:
        const degree = manipulatingForm.payload as Degree | undefined;

        return (
          <TutorDegreeManipulatingForm
            onClose={closeManipulatingForm}
            academicRankList={academicRankList || []}
            degree={degree}
          />
        );

      case 3:
        const certificate = manipulatingForm.payload as Certificate | undefined;

        return (
          <TutorCertificateManipulatingForm
            onClose={closeManipulatingForm}
            certificate={certificate}
          />
        );

      default:
        return <ErrorIndicator />;
    }
  };

  return (
    <>
      <TutorProfile
        chosenSection={chosenSection.value}
        setChosenSection={setChosenSection}
      >
        <Box className={styles.actionContainer}>
          <Button
            size="sm"
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
            onClick={() => openManipulatingForm(null)}
          >
            add new {renderSectionText()}
          </Button>
        </Box>
        <Box className={styles.contentContainerWrapper}>
          <Box className={styles.contentContainer}>{renderSection()}</Box>
        </Box>
      </TutorProfile>

      <Modal
        title={`add new ${renderSectionText()}`}
        opened={manipulatingForm.opened}
        onClose={closeManipulatingForm}
        radius="lg"
        centered
        size="xl"
      >
        {renderForm()}
      </Modal>
    </>
  );
}
