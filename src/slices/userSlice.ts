import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserApi, registerUserApi, TRegisterData } from '@api';
import { TUser } from '@utils-types';

interface UserListState {
  user: TUser;
  userIsLoading: boolean;
  loginIsLoading: boolean;
  registrationIsLoading: boolean;
  updateUserIsLoading: boolean;
}

const initialState: UserListState = {
  user: {
    email: '',
    name: ''
  },
  userIsLoading: false,
  loginIsLoading: false,
  registrationIsLoading: false,
  updateUserIsLoading: false
};

export const fetchGetUserApi = createAsyncThunk('user/getUserApi', async () =>
  getUserApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.userIsLoading = false;
    }
  },
  extraReducers: (builder) => {
    // получение пользователя
    builder.addCase(fetchGetUserApi.pending, (state: UserListState) => {
      state.userIsLoading = true;
    });
    builder.addCase(
      fetchGetUserApi.fulfilled,
      (state: UserListState, action) => {
        state.user = action.payload.user;
        state.userIsLoading = false;
      }
    );
    builder.addCase(
      fetchGetUserApi.rejected,
      (state: UserListState, action) => {
        state.userIsLoading = false;
      }
    );
  },
  selectors: {
    selectUserData: (sliceState) => sliceState.user,
    selectUserIsLoading: (sliceState) => sliceState.userIsLoading
  }
});

export const { selectUserData, selectUserIsLoading } = userSlice.selectors;
export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
