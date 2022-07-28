import React from 'react';

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

import { RentalUpdateDto } from '../../../../dtos/tutors';
import { Tutor } from '../../../../models/tutor';
import { getDateString } from '../../../../utils';

type Props = {
  list: Tutor[];
  isLoading: boolean;

  openRentalUpdateForm: (
    tutorId: string,
    defaultValues?: RentalUpdateDto
  ) => () => void;
  openDetailsForm: (tutorId: string) => () => void;
};

export function ActiveTutorList({
  list,
  isLoading,
  openRentalUpdateForm,
  openDetailsForm,
}: Props) {
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
            {isLoading ? <Spinner /> : <Text>Tutors</Text>}
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
              }) => (
                <Tr key={id}>
                  <Td>{fullName}</Td>
                  <Td>{firstName}</Td>
                  <Td>{lastName}</Td>
                  <Td>{getDateString(dateOfBirth)}</Td>
                  <Td>{gender}</Td>
                  <Td>{getDateString(createdAt)}</Td>
                  <Td display="flex" gap={4} alignItems="center">
                    <Text>
                      {`${rentalAmount.toLocaleString()} ${
                        rentalUnit || 'N/A'
                      }`}
                    </Text>
                    <Button
                      size="xs"
                      colorScheme="yellow"
                      onClick={openRentalUpdateForm(id, {
                        amount: rentalAmount,
                        unit: rentalUnit,
                      })}
                    >
                      Update
                    </Button>
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
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
