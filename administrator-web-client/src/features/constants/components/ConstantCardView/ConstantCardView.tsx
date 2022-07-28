import React, { useState } from 'react';

import { Box, Button, ButtonGroup, Heading, Text } from '@chakra-ui/react';

import { ConfirmModal } from '../../../../components/ConfirmModal';
import { ConstantType } from '../../../../constants/features/constants';
import { QueryKey } from '../../../../constants/shared';
import { Constant, Currency } from '../../../../models/constant';
import { useRemoveConstant, useRemoveEducationalGrade } from '../../hooks';

type Props = {
  constant: Constant | Currency;
  openManipulatingForm: (constant?: Constant) => void;
  type?: ConstantType;
  queryKey?: QueryKey;
  chosenEducationalLevelId?: string;
};

export function ConstantCardView({
  constant,
  openManipulatingForm,
  type,
  queryKey,
  chosenEducationalLevelId,
}: Props) {
  const { id, name } = constant;

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

  const { mutateAsync: remove, isLoading: deleting } = useRemoveConstant({
    queryKey,
    type,
  });

  const {
    mutateAsync: removeEducationalGrade,
    isLoading: deletingEducationalGrade,
  } = useRemoveEducationalGrade();

  const onOpenForm = () => {
    openManipulatingForm(constant);
  };

  const onToggleConfirmModal = () => {
    setConfirmModalOpened(!confirmModalOpened);
  };

  const onDeleteClick = async () => {
    const isDeletingEducationalGrade = !type && !!chosenEducationalLevelId;
    if (isDeletingEducationalGrade) {
      await removeEducationalGrade({
        id: constant.id,
        educationalLevelId: chosenEducationalLevelId,
      });
    } else {
      await remove(id);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDir="column"
        shadow="lg"
        bg="blue.600"
        p={4}
        borderRadius="lg"
        gap={2}
      >
        <Heading size="sm" color="gray.100" fontWeight={900}>
          ID: {id}
        </Heading>

        {!!(constant as Currency)?.code && (
          <Text color="gray.50" fontWeight={400}>
            Code: {(constant as Currency)?.code}
          </Text>
        )}

        <Text color="gray.50" fontWeight={400}>
          Name: {name}
        </Text>

        <ButtonGroup justifyContent="flex-end">
          <Button size="xs" onClick={onOpenForm}>
            Edit
          </Button>
          <Button size="xs" colorScheme="red" onClick={onToggleConfirmModal}>
            Delete
          </Button>
        </ButtonGroup>
      </Box>

      <ConfirmModal
        onClose={onToggleConfirmModal}
        opened={confirmModalOpened}
        warningText="Do you really want to remove this constant?"
        isLoading={deleting || deletingEducationalGrade}
        onYes={onDeleteClick}
      />
    </>
  );
}
