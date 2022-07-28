import { useNavigate } from 'react-router-dom';

import { LoadingOverlay, Text } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useModals } from '@mantine/modals';

import { TutorRegistrationDto } from '../../../../shared/dtos/tutor';
import { TutorRegistrationForm } from '../../components/TutorRegistrationForm';
import { TutorRegistrationContextProvider } from '../../contexts';
import { useRegisterTutor } from '../../hooks';

export function TutorRegistrationManagement() {
  useDocumentTitle('Tutor Registration');

  const { mutateAsync: register, isLoading: registering } = useRegisterTutor();
  const navigate = useNavigate();

  const { openConfirmModal } = useModals();

  const onSubmit = async (dto: TutorRegistrationDto) => {
    await register(dto);

    openConfirmModal({
      title: 'Congratulations',
      children: (
        <Text size="sm">
          Your tutor registration form has been sent and will be processed soon.
          Thank you for choosing us.
        </Text>
      ),
      labels: { confirm: 'confirm', cancel: 'back' },
      onConfirm: () => navigate('/'),
      onCancel: () => navigate('/'),
    });
  };

  return (
    <TutorRegistrationContextProvider onSubmit={onSubmit}>
      <TutorRegistrationForm />
      <LoadingOverlay visible={registering} />
    </TutorRegistrationContextProvider>
  );
}
