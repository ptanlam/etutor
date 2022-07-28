import React from 'react';

import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type Props = {
  opened: boolean;
  isLoading?: boolean;
  warningText: string;

  onClose: () => void;
  onYes: () => void;
  onNo?: () => void;
};

export function ConfirmModal({
  opened,
  warningText,
  isLoading,

  onClose,
  onYes,
  onNo,
}: Props) {
  return (
    <Modal isOpen={opened} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="yellow.500">Warning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{warningText}</ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              size="sm"
              onClick={() => {
                onNo?.();
                onClose();
              }}
            >
              No
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={onYes}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
