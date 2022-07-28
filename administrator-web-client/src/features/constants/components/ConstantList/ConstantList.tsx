import React from 'react';

import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react';

import { ConstantType } from '../../../../constants/features/constants';
import { QueryKey } from '../../../../constants/shared';
import { Constant } from '../../../../models/constant';
import { ConstantCardView } from '../ConstantCardView';

type Props = {
  list: Constant[];
  openManipulatingForm: (constant?: Constant) => void;

  //* for regular constants
  type?: ConstantType;
  queryKey?: QueryKey;

  //* for educational grade
  chosenEducationalLevelId?: string;
};

export function ConstantList({
  list,
  type,
  queryKey,
  openManipulatingForm,
  chosenEducationalLevelId,
}: Props) {
  const onOpenForm = () => {
    openManipulatingForm();
  };

  return (
    <Box display="flex" flexDir="column" gap={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="md" color="gray.500">
          {list.length} result{list.length === 1 ? '' : 's'}
        </Heading>

        <Button colorScheme="orange" padding="0 32px" onClick={onOpenForm}>
          Add
        </Button>
      </Box>

      <SimpleGrid columns={4} spacing={4}>
        {list.map((item) => (
          <ConstantCardView
            key={item.id}
            constant={item}
            openManipulatingForm={openManipulatingForm}
            type={type}
            queryKey={queryKey}
            chosenEducationalLevelId={chosenEducationalLevelId}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
