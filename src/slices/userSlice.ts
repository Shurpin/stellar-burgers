import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { fetchOrderBurgerApi } from './orderSlice';

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

export const fetchLoginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchRegisterUserApi = createAsyncThunk(
  'user/registerUserApi',
  async (data: TRegisterData) => registerUserApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user;
    }
  },
  extraReducers: (builder) => {},
  selectors: {
    selectUserData: (sliceState) => sliceState.user,
    selectUserIsLoading: (sliceState) => sliceState.userIsLoading
  }
});

export const { selectUserData } = userSlice.selectors;
export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
