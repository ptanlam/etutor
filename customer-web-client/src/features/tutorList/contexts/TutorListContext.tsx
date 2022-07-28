import React, { PropsWithChildren, createContext } from 'react';

import { Tutor } from '../../../models/tutor';

type Props = {
  bookTutor: (tutor: Tutor) => void;
};

export const TutorListContext = createContext<Props>({} as Props);

type TutorListContextProviderProps = {
  bookTutor: (tutor: Tutor) => void;
};

export function TutorListContextProvider({
  children,
  bookTutor,
}: PropsWithChildren<TutorListContextProviderProps>) {
  return (
    <TutorListContext.Provider value={{ bookTutor }}>
      {children}
    </TutorListContext.Provider>
  );
}
