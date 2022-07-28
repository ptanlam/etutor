import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { Certificate, Degree, TutorDetails } from '../../models/tutor';

type State = {
  details: TutorDetails;
};

const initialState: State = {
  details: {
    id: '',

    email: '',
    phoneNumber: '',
    firstName: '',
    fullName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',

    description: '',
    certificates: [],
    degrees: [],
    createdAt: '',
    rentalAmount: 0,
    rentalUnit: 'N/A',

    images: [],
  },
};

const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    setTutorDetails(state, action: PayloadAction<string>) {
      state.details = { ...(JSON.parse(action.payload) as TutorDetails) };
    },

    setTutorDegree(state, action: PayloadAction<Degree>) {
      state.details.degrees = addOrReplaceElement(
        state.details.degrees,
        action.payload,
        (d) => d.id === action.payload.id
      );
    },

    setTutorCertificate(state, action: PayloadAction<Certificate>) {
      state.details.certificates = addOrReplaceElement(
        state.details.certificates,
        action.payload,
        (c) => c.id === action.payload.id
      );
    },
  },
});

function addOrReplaceElement<T>(
  elementList: T[],
  newElement: T,
  predicate: (element: T) => boolean
) {
  const elementIndex = elementList.findIndex(predicate);
  if (elementIndex === -1) return [newElement, ...elementList];

  return [
    ...elementList.slice(0, elementIndex),
    newElement,
    ...elementList.slice(elementIndex + 1),
  ];
}

export default tutorSlice.reducer;
export const { setTutorDetails, setTutorDegree, setTutorCertificate } =
  tutorSlice.actions;

export const tutorDetailsSelector = (state: RootState) => state.tutor.details;
