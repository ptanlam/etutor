import React, { useState } from 'react';
import { UseMutateAsyncFunction } from 'react-query';

import {
  Button,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { ConfirmModal } from '../../../../components/ConfirmModal';
import { Tutor } from '../../../../models/tutor';
import { getDateString } from '../../../../utils';

type Props = {
  list: Tutor[];
  loading: boolean;
  approving: boolean;

  openRentalUpdateForm: (tutorId: string) => () => void;
  openDetailsForm: (tutorId: string) => () => void;

  onApprove: UseMutateAsyncFunction<
    unknown,
    unknown,
    {
      tutorId: string;
      isActive: boolean;
    },
    unknown
  >;
};

export function PendingTutorRegistrationList({
  list,
  loading,
  onApprove,
  approving,
  openRentalUpdateForm,
  openDetailsForm,
}: Props) {
  const [confirmModal, setConfirmModal] = useState({
    opened: false,
    tutorId: '',
  });

  const onConfirmModalOpen = (tutorId: string) => {
    return () =>
      setConfirmModal((prev) => ({ ...prev, opened: true, tutorId }));
  };

  const onConfirmModalClose = () => {
    return setConfirmModal((prev) => ({ ...prev, opened: false, tutorId: '' }));
  };

  const onApproveClick = async () => {
    await onApprove({ tutorId: confirmModal.tutorId, isActive: true });
    onConfirmModalClose();
  };

  return (
    <>
      <TableContainer
        bg="gray.50"
        shadow="0 0 8px rgba(0, 0, 0, 0.1)"
        borderRadius={12}
        overflowY="scroll"
      >
        <Table variant="simple">
          <TableCaption>
            {loading ? <Spinner /> : <Text>Pending tutor registrations</Text>}
          </TableCaption>

          <Thead>
            <Tr>
              <Th>Full name</Th>
              <Th>First name</Th>
              <Th>Last name</Th>
              <Th>Date of birth</Th>
              <Th>Gender</Th>
              <Th>Registration date</Th>
              <Th>Rental fee</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody>
            {list.map(
              ({
                id,
                fullName,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                createdAt,
                rentalAmount,
                rentalUnit,
              }) => {
                const canBeApproved = !!rentalAmount;

                return (
                  <Tr key={id}>
                    <Td>{fullName}</Td>
                    <Td>{firstName}</Td>
                    <Td>{lastName}</Td>
                    <Td>{getDateString(dateOfBirth)}</Td>
                    <Td>{gender}</Td>
                    <Td>{getDateString(createdAt)}</Td>
                    <Td>
                      {canBeApproved ? (
                        `${rentalAmount.toLocaleString()} ${
                          rentalUnit || 'N/A'
                        }`
                      ) : (
                        <Button
                          size="xs"
                          colorScheme="telegram"
                          onClick={openRentalUpdateForm(id)}
                        >
                          Update
                        </Button>
                      )}
                    </Td>
                    <Td>
                      <Button
                        size="xs"
                        colorScheme="teal"
                        onClick={openDetailsForm(id)}
                      >
                        Details
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        size="xs"
                        colorScheme="messenger"
                        disabled={!canBeApproved}
                        onClick={onConfirmModalOpen(id)}
                      >
                        Approve
                      </Button>
                    </Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <ConfirmModal
        opened={confirmModal.opened}
        onClose={onConfirmModalClose}
        warningText="You're about to approve this tutor registration. Are you sure?"
        onYes={onApproveClick}
        isLoading={approving}
      />
    </>
  );
}
