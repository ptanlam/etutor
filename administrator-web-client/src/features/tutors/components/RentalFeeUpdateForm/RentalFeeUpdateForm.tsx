import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as yup from 'yup';

import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  ModalBody,
  ModalFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { ApplicationContext } from '../../../../contexts';
import { RentalUpdateDto } from '../../../../dtos/tutors';
import { Currency } from '../../../../models/constant';
import { PaginationMetadata } from '../../../../shared/models';
import { useUpdateTutorRental } from '../../hooks';

type Props = {
  tutorId: string;
  isActive: boolean;
  pagination: PaginationMetadata;
  defaultValues?: RentalUpdateDto;

  onClose: () => void;
};

const schema = yup.object({
  amount: yup.number().min(0).required(),
  unit: yup.string().length(3).required(),
});

export function RentalFeeUpdateForm({
  tutorId,
  pagination,
  isActive,
  defaultValues,
  onClose,
}: Props) {
  const { constantsService } = useContext(ApplicationContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RentalUpdateDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { data: currencyList } = useQuery('currencies', () =>
    constantsService.getConstantList<Currency>('currencies'),
  );

  const { mutateAsync: updateRental, isLoading } =
    useUpdateTutorRental(tutorId);

  const onSubmit = async (dto: RentalUpdateDto) => {
    await updateRental({ ...dto, ...pagination, isActive });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody display="flex" flexDir="column" gap={4}>
        <FormControl isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <NumberInput id="amount" {...field}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
          {errors.amount ? (
            <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Enter rental fee.</FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.unit}>
          <FormLabel htmlFor="unit">Unit</FormLabel>
          <Controller
            control={control}
            name="unit"
            render={({ field }) => (
              <Select {...field}>
                <option value={undefined}>Please select a currency</option>
                {currencyList?.map(({ id, code }) => (
                  <option value={code} key={id}>
                    {code}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.unit ? (
            <FormErrorMessage>{errors.unit.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Enter rental fee unit.</FormHelperText>
          )}
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <ButtonGroup>
          <Button size="sm" onClick={onClose} isLoading={isLoading}>
            Cancel
          </Button>

          <Button
            size="sm"
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
          >
            Update
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </form>
  );
}
