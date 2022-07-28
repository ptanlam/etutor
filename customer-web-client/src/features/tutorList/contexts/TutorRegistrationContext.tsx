import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { createContext } from 'react';
import { useSelector } from 'react-redux';

import { TutorRegistrationDto } from '../../../shared/dtos/tutor';
import { userDetailsSelector } from '../../user/userSlice';

type Props = Partial<TutorRegistrationDto>;

export const TutorRegistrationContext = createContext<{
  dto: Props;
  setDto: Dispatch<SetStateAction<Props>>;
  submit: () => void;
}>({ dto: {}, setDto: () => {}, submit: () => {} });

type ProviderProps = { onSubmit: (dto: TutorRegistrationDto) => Promise<void> };

export const TutorRegistrationContextProvider = ({
  children,
  onSubmit,
}: PropsWithChildren<ProviderProps>) => {
  const [state, setState] = useState<Props>({});
  const { id: userId, fullName } = useSelector(userDetailsSelector);

  return (
    <TutorRegistrationContext.Provider
      value={{
        dto: state,
        setDto: setState,
        submit: () =>
          onSubmit({
            userId,
            fullName,
            description: state?.description || '',
            degrees: state?.degrees || [],
            certificates: state?.certificates || [],
            subjects: state?.subjects || [],
            images: state?.images,
          }),
      }}
    >
      {children}
    </TutorRegistrationContext.Provider>
  );
};
