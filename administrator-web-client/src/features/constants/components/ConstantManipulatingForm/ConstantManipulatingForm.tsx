import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { ConstantType } from '../../../../constants/features/constants';
import { QueryKey } from '../../../../constants/shared';
import { ConstantCreationDto } from '../../../../dtos/constants';
import { Constant, Currency } from '../../../../models/constant';
import { useAddConstant, useUpdateConstant } from '../../hooks';

type Props = {
  type?: ConstantType;
  constant?: Constant | Currency;
  queryKey: QueryKey;
  closeForm: () => void;
};

const schema = yup.object({
  name: yup.string().max(250).min(3).required(),
  code: yup.string().length(3),
});

export function ConstantManipulatingForm({
  type,
  queryKey,
  constant,
  closeForm,
}: Props) {
  const isUpdatingMode = !!constant;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConstantCreationDto>({
    resolver: yupResolver(schema),
    defaultValues: { name: constant?.name, code: (constant as Currency)?.code },
  });

  const { mutateAsync: add, isLoading: adding } = useAddConstant(
    queryKey,
    type
  );

  const { mutateAsync: update, isLoading: updating } = useUpdateConstant(
    queryKey,
    type
  );

  const onSubmit = async (dto: ConstantCreationDto) => {
    if (!isUpdatingMode) {
      await add(dto);
    } else if (!!constant?.id) {
      await update({ id: constant.id, dto });
    }

    closeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody display="flex" flexDirection="column" gap={4}>
        {type === 'currencies' && (
          <FormControl isInvalid={!!errors.code}>
            <FormLabel htmlFor="code">Code</FormLabel>
            <Input id="code" type="text" {...register('code')} />
            {errors.code ? (
              <FormErrorMessage>{errors.code.message}</FormErrorMessage>
            ) : (
              <FormHelperText>Enter code of the currency.</FormHelperText>
            )}
          </FormControl>
        )}

        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" type="text" {...register('name')} />
          {errors.name ? (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Enter name of the constant.</FormHelperText>
          )}
        </FormControl>
      </ModalBody>

      <ModalFooter gap={2}>
        <Button size="sm" onClick={closeForm}>
          Cancel
        </Button>

        <Button
          size="sm"
          colorScheme="blue"
          type="submit"
          isLoading={adding || updating}
        >
          {isUpdatingMode ? 'Update' : 'Add'}
        </Button>
      </ModalFooter>
    </form>
  );
}
