import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  InputWrapper,
  LoadingOverlay,
  PasswordInput,
  Select,
  Text,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useModals } from '@mantine/modals';

import { Gender } from '../../../../models/constant';
import { UserRegistrationDto } from '../../../../shared/dtos/identity';
import { VisibilityProps } from '../../../../shared/props';
import {
  accountInfoSchema,
  personalInfoSchemaWithPhoneNumberValidator,
} from '../../../../shared/schemas';
import { useRegisterUser } from '../../hooks';
import styles from './UserRegistrationForm.module.css';

interface PersonalInformationDto
  extends Omit<
    UserRegistrationDto,
    'email' | 'password' | 'confirmationPassword'
  > {}

interface AccountInformationDto
  extends Pick<
    UserRegistrationDto,
    'email' | 'password' | 'confirmationPassword'
  > {}

type Props = { genderList: Gender[] };

export function UserRegistrationForm({ genderList }: Props) {
  const [step, setStep] = useState(1);
  const [personalInformationDto, setPersonalInformationDto] = useState<
    PersonalInformationDto | undefined
  >();

  const navigate = useNavigate();
  const { openConfirmModal } = useModals();
  const { loginWithRedirect } = useAuth0();

  const { mutateAsync: registerAccount, isLoading: registering } =
    useRegisterUser();

  const onPersonalInfoSubmit = (dto: PersonalInformationDto) => {
    setStep((step) => (step += 1));
    setPersonalInformationDto((prev) => ({ ...prev, ...dto }));
  };

  const onAccountInfoSubmit = async (dto: AccountInformationDto) => {
    if (!personalInformationDto) return;
    await registerAccount({ ...personalInformationDto, ...dto });

    openConfirmModal({
      title: 'Congratulations',
      children: <Text>Your account has been registered successfully.</Text>,
      labels: { confirm: 'Login', cancel: 'Back' },
      onConfirm: loginWithRedirect,
      onCancel: () => navigate('/'),
    });
  };

  return (
    <Container size="sm" className={styles.container}>
      <Box className={styles.form}>
        <AnimatePresence>
          <PersonalInformation
            key={1}
            isVisible={step === 1}
            genderList={genderList}
            onSubmit={onPersonalInfoSubmit}
          />

          <AccountInformation
            key={2}
            isVisible={step === 2}
            onBack={() => setStep((step) => (step -= 1))}
            registering={registering}
            onSubmit={onAccountInfoSubmit}
          />
        </AnimatePresence>
      </Box>
    </Container>
  );
}

type PersonalInformationProps = VisibilityProps & {
  genderList: Gender[];
  onSubmit: (dto: PersonalInformationDto) => void;
};

function PersonalInformation({
  isVisible,
  genderList,
  onSubmit,
}: PersonalInformationProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<PersonalInformationDto>({
    resolver: yupResolver(personalInfoSchemaWithPhoneNumberValidator),
  });

  return (
    <>
      {isVisible && (
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.subFormContainer}
          initial={{ x: 100, opacity: 0, display: 'none' }}
          animate={{ x: 0, opacity: 1, display: 'flex' }}
          exit={{ x: -100, opacity: 0 }}
        >
          <Title order={2}>Personal Information</Title>

          <Grid>
            <Grid.Col span={12}>
              <InputWrapper
                label="first name"
                description="please enter your first name"
                error={errors.firstName?.message}
                size="md"
                required
              >
                <Input radius="md" {...register('firstName')} />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col span={12}>
              <InputWrapper
                label="middle name"
                description="please enter your middle name"
                error={errors.middleName?.message}
                size="md"
              >
                <Input radius="md" {...register('middleName')} />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col span={12}>
              <InputWrapper
                label="last name"
                description="please enter your last name"
                error={errors.lastName?.message}
                size="md"
                required
              >
                <Input radius="md" {...register('lastName')} />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col span={12}>
              <InputWrapper
                label="phone number"
                description="please enter your phone number"
                error={errors.phoneNumber?.message}
                size="md"
                required
              >
                <Input radius="md" {...register('phoneNumber')} />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col span={6}>
              <InputWrapper
                label="gender"
                description="please select your gender"
                error={errors.genderId?.message}
                size="md"
                required
              >
                <Controller
                  name="genderId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      radius="md"
                      data={
                        genderList?.map(({ name, id }) => ({
                          label: name,
                          value: id,
                        })) ?? []
                      }
                    />
                  )}
                />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col span={6}>
              <InputWrapper
                label="date of birth"
                description="please select your date of birth"
                error={errors.dateOfBirth?.message}
                size="md"
                required
              >
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field: { value, ...rest } }) => (
                    <DatePicker
                      className={styles.select}
                      radius="md"
                      maxDate={new Date()}
                      value={value ? new Date(value) : null}
                      {...rest}
                    />
                  )}
                />
              </InputWrapper>
            </Grid.Col>
          </Grid>

          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="subtle"
              rightIcon={<BiChevronsRight />}
            >
              next
            </Button>
          </Box>
        </motion.form>
      )}
    </>
  );
}
type AccountInformationProps = VisibilityProps & {
  registering: boolean;
  onBack: () => void;
  onSubmit: (dto: AccountInformationDto) => Promise<void>;
};

function AccountInformation({
  isVisible,
  registering,
  onSubmit,
  onBack,
}: AccountInformationProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AccountInformationDto>({
    resolver: yupResolver(accountInfoSchema),
  });

  return (
    <>
      {isVisible && (
        <motion.form
          className={styles.subFormContainer}
          onSubmit={handleSubmit(onSubmit)}
          initial={{ x: 100, opacity: 0, display: 'none' }}
          animate={{ x: 0, opacity: 1, display: 'flex' }}
          exit={{ x: -100, opacity: 0, display: 'none' }}
        >
          <LoadingOverlay visible={registering} />
          <Title>Account Information</Title>

          <Grid>
            <Grid.Col span={12}>
              <InputWrapper
                label="email"
                description="please enter your email"
                error={errors.email?.message}
                size="md"
                required
              >
                <Input radius="md" {...register('email')} />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col span={12}>
              <InputWrapper
                label="password"
                description="please enter your password"
                error={errors.password?.message}
                size="md"
                required
              >
                <PasswordInput
                  radius="md"
                  {...register('password')}
                  autoComplete="on"
                />
              </InputWrapper>
            </Grid.Col>

            <Grid.Col span={12}>
              <InputWrapper
                label="re-enter your password"
                error={errors.confirmationPassword?.message}
                size="md"
                required
              >
                <PasswordInput
                  radius="md"
                  {...register('confirmationPassword')}
                  autoComplete="on"
                />
              </InputWrapper>
            </Grid.Col>
          </Grid>

          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="subtle"
              leftIcon={<BiChevronsLeft />}
              onClick={onBack}
            >
              back
            </Button>
            <Button
              type="submit"
              variant="subtle"
              rightIcon={<BiChevronsRight />}
            >
              next
            </Button>
          </Box>
        </motion.form>
      )}
    </>
  );
}
