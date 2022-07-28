import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { Wrapper } from '../../../../components/Wrapper';
import { ConstantType } from '../../../../constants/features/constants';
import { QueryKey } from '../../../../constants/shared';
import { ApplicationContext } from '../../../../contexts';
import { Constant } from '../../../../models/constant';
import { ConstantList } from '../../components/ConstantList';
import { ConstantManipulatingForm } from '../../components/ConstantManipulatingForm';

type Props = { type: ConstantType; queryKey: QueryKey };

export function ConstantListPage({ type, queryKey }: Props) {
  const { constantsService } = useContext(ApplicationContext);

  const [manipulatingForm, setManipulatingForm] = useState<{
    opened: boolean;
    constant?: Constant;
  }>({ opened: false });

  const { data, isLoading, isError } = useQuery(queryKey, () =>
    constantsService.getConstantList(type)
  );

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
      <Wrapper
        type="section"
        loading={isLoading}
        hasError={isError}
        data={data}
      >
        <ConstantList
          list={data!}
          openManipulatingForm={openManipulatingForm}
          type={type}
          queryKey={queryKey}
        />
      </Wrapper>

      <Modal
        isOpen={manipulatingForm.opened}
        onClose={closeManipulatingForm}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add constant</ModalHeader>
          <ModalCloseButton />
          <ConstantManipulatingForm
            type={type}
            closeForm={closeManipulatingForm}
            queryKey={queryKey}
            constant={manipulatingForm.constant}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
