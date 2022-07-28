import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { Pagination } from '../../../../components/Pagination';
import { Wrapper } from '../../../../components/Wrapper';
import { QueryKey } from '../../../../constants/shared';
import { ApplicationContext } from '../../../../contexts';
import { RentalUpdateDto } from '../../../../dtos/tutors';
import { environment } from '../../../../environment';
import { useGetAccessToken, usePagination } from '../../../../hooks';
import { ApplicationScope } from '../../../../shared/enums';
import { ActiveTutorList } from '../../components/ActiveTutorList';
import { PendingTutorRegistrationList } from '../../components/PendingTutorRegistrationList';
import { RentalFeeUpdateForm } from '../../components/RentalFeeUpdateForm';
import { TutorDetails } from '../../components/TutorDetails';
import { useSetTutorActiveStatus } from '../../hooks';

type Props = { isActive: boolean };

export function TutorListPage({ isActive }: Props) {
  const { tutorsService } = useContext(ApplicationContext);

  const getAccessToken = useGetAccessToken();
  const { pagination, setCurrentPage, setTotalCount, setTotalPage } =
    usePagination(10, 1);

  const { mutateAsync: approve, isLoading: approving } =
    useSetTutorActiveStatus(pagination.currentPage, pagination.pageSize);

  const [rentalUpdateForm, setRentalUpdateForm] = useState<{
    opened: boolean;
    tutorId: string;
    defaultValues?: RentalUpdateDto;
  }>({
    opened: false,
    tutorId: '',
  });

  const [detailsModal, setDetailsModal] = useState({
    opened: false,
    tutorId: '',
  });

  const { data: response, isLoading } = useQuery(
    [
      isActive ? QueryKey.Tutors : QueryKey.InactiveTutors,
      pagination.currentPage,
      pagination.pageSize,
    ],
    async ({ signal }) => {
      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        scope: ApplicationScope.READ_INACTIVE_TUTORS,
      });

      const response = await tutorsService.getTutorPagedList(
        {
          pageNumber: pagination.currentPage,
          pageSize: pagination.pageSize,
          isActive,
        },
        accessToken,
        signal
      );

      setTotalPage(response.pagination.totalPage);
      setTotalCount(response.pagination.totalCount);

      return response;
    }
  );

  const {
    data: tutorDetails,
    isLoading: fetchingDetails,
    isError: fetchingDetailsError,
  } = useQuery(
    [QueryKey.TutorDetails, detailsModal.tutorId],
    ({ signal }) => tutorsService.getTutorDetails(detailsModal.tutorId, signal),
    {
      enabled: detailsModal.opened && !!detailsModal.tutorId,
      refetchOnWindowFocus: false,
    }
  );

  const onRentalUpdateFormOpen = (
    tutorId: string,
    defaultValues?: RentalUpdateDto
  ) => {
    return () =>
      setRentalUpdateForm((prev) => ({
        ...prev,
        opened: true,
        tutorId,
        defaultValues,
      }));
  };

  const onRentalUpdateFormClose = () => {
    setRentalUpdateForm((prev) => ({
      ...prev,
      opened: false,
      tutorId: '',
      defaultValues: undefined,
    }));
  };

  const onDetailsModalOpen = (tutorId: string) => {
    return () =>
      setDetailsModal((prev) => ({ ...prev, opened: true, tutorId }));
  };

  const onDetailsModalClose = () => {
    setDetailsModal((prev) => ({ ...prev, opened: false, tutorId: '' }));
  };

  return (
    <>
      <Box
        height="100%"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        gap={8}
      >
        {isActive ? (
          <ActiveTutorList
            list={response?.data || []}
            isLoading={isLoading}
            openDetailsForm={onDetailsModalOpen}
            openRentalUpdateForm={onRentalUpdateFormOpen}
          />
        ) : (
          <PendingTutorRegistrationList
            list={response?.data || []}
            loading={isLoading}
            onApprove={approve}
            approving={approving}
            openRentalUpdateForm={onRentalUpdateFormOpen}
            openDetailsForm={onDetailsModalOpen}
          />
        )}

        <Pagination
          onPageChange={setCurrentPage}
          pageCount={pagination.totalPage}
        />
      </Box>

      <Modal
        isOpen={rentalUpdateForm.opened}
        onClose={onRentalUpdateFormClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Update tutor's rental fee</ModalHeader>
          <RentalFeeUpdateForm
            {...rentalUpdateForm}
            isActive={isActive}
            pagination={pagination}
            onClose={onRentalUpdateFormClose}
          />
        </ModalContent>
      </Modal>

      <Modal
        isOpen={detailsModal.opened}
        onClose={onDetailsModalClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Details</ModalHeader>
          <ModalBody>
            <Wrapper
              data={tutorDetails}
              type="section"
              loading={fetchingDetails}
              hasError={fetchingDetailsError}
            >
              <TutorDetails details={tutorDetails!} />
            </Wrapper>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" colorScheme="blue" onClick={onDetailsModalClose}>
              Back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
