import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import {
  Box,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';

import { Wrapper } from '../../../../components/Wrapper';
import { QueryKey } from '../../../../constants/shared';
import { ApplicationContext } from '../../../../contexts';
import { Constant } from '../../../../models/constant';
import { ConstantList } from '../../components/ConstantList';
import { EducationalGradeManipulatingForm } from '../../components/EducationalGradeManipulatingForm';

export function EducationalGradeListPage() {
  const { constantsService } = useContext(ApplicationContext);

  const [educationalLevelId, setEducationalLevelId] = useState('');
  const [manipulatingForm, setManipulatingForm] = useState<{
    opened: boolean;
    constant?: Constant;
  }>({ opened: false });

  const { data: educationalLevelList } = useQuery(
    QueryKey.EducationalGrades,
    () => constantsService.getConstantList('educational-levels')
  );

  const { data, isLoading, isError } = useQuery(
    [
      QueryKey.EducationalLevels,
      educationalLevelId,
      QueryKey.EducationalGrades,
    ],
    () => constantsService.getEducationalGradeList(educationalLevelId),
    { enabled: !!educationalLevelId }
  );

  const onEducationalLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEducationalLevelId(event.currentTarget.value);
  };

  const openManipulatingForm = (constant?: Constant) => {
    setManipulatingForm((prev) => ({ ...prev, opened: true, constant }));
  };

  const closeManipulatingForm = () => {
    setManipulatingForm((prev) => ({
      ...prev,
      opened: false,
      constant: undefined,
    }));
  };

  return (
    <>
      <Box display="flex" flexDir="column" gap={6} h="100%">
        <Select
          placeholder="Select educational level"
          onChange={onEducationalLevelChange}
          maxWidth="50%"
          bg="gray.50"
          border="none"
          boxShadow="0 0 8px rgba(0, 0, 0, 0.1)"
          cursor="pointer"
          fontWeight={700}
        >
          {(educationalLevelList || []).map((el) => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </Select>

        <Box flex={1}>
          {!!educationalLevelId ? (
            <Wrapper
              type="section"
              loading={isLoading}
              hasError={isError}
              data={data}
            >
              <ConstantList
                list={data!}
                openManipulatingForm={openManipulatingForm}
                chosenEducationalLevelId={educationalLevelId}
              />
            </Wrapper>
          ) : (
            <Heading size="sm" fontWeight={400}>
              Please select an educational level.
            </Heading>
          )}
        </Box>
      </Box>

      <Modal
        isOpen={manipulatingForm.opened}
        onClose={closeManipulatingForm}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add educational grade</ModalHeader>
          <ModalCloseButton />
          <EducationalGradeManipulatingForm
            grade={manipulatingForm.constant}
            closeForm={closeManipulatingForm}
            chosenEducationalLevelId={educationalLevelId}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
