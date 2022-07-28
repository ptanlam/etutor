import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ApplicationUser } from '../../models/identity';

type State = {
  details: ApplicationUser;
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
    avatarUrl: '',
    roles: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<string>) {
      state.details = { ...(JSON.parse(action.payload) as ApplicationUser) };
    },
  },
});

export default userSlice.reducer;
export const { setUserDetails } = userSlice.actions;

export const userDetailsSelector = (state: RootState) => state.user.details;
export const userRolesSelector = (state: RootState) => state.user.details.roles;
