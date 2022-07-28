import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../../../contexts';
import { UserRegistrationDto } from '../../../shared/dtos/identity';

export function useRegisterUser() {
  const navigate = useNavigate();
  const { identityService } = useContext(ApplicationContext);

  return useMutation(
    (dto: UserRegistrationDto) => identityService.register(dto),
    {
      onSuccess: () => {
        navigate('/');
      },
    }
  );
}
