import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

interface UserListState {
  isAuthenticated: boolean;
  user: TUser;
  userIsLoading: boolean;
  loginIsLoading: boolean;
  updateIsLoading: boolean;
  registrationIsLoading: boolean;
  updateUserIsLoading: boolean;
}

const initialState: UserListState = {
  isAuthenticated: false,
  user: {
    email: '',
    name: ''
  },
  updateIsLoading: false,
  userIsLoading: false,
  loginIsLoading: false,
  registrationIsLoading: false,
  updateUserIsLoading: false
};

export const fetchGetUserApi = createAsyncThunk('user/getUserApi', async () =>
  getUserApi()
);

export const fetchLoginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchUpdateUserApi = createAsyncThunk(
  'user/updateUserApi',
  async (data: TLoginData) => updateUserApi(data)
);

export const fetchRegisterUserApi = createAsyncThunk(
  'user/registerUserApi',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchLogoutApi = createAsyncThunk('user/logoutApi', async () =>
  logoutApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // получение пользователя
    builder.addCase(fetchGetUserApi.pending, (state: UserListState) => {
      state.userIsLoading = true;
    });
    builder.addCase(
      fetchGetUserApi.fulfilled,
      (state: UserListState, action) => {
        state.isAuthenticated = true;
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
    // получение пользователя
    builder.addCase(fetchLogoutApi.pending, (state: UserListState) => {
      state.userIsLoading = true;
    });
    builder.addCase(fetchLogoutApi.fulfilled, (state, action) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      state.isAuthenticated = false;
      state.user = {
        email: '',
        name: ''
      };
      window.location.replace('/');
    });
    // обновление пользователя
    builder.addCase(fetchUpdateUserApi.pending, (state: UserListState) => {
      state.updateIsLoading = true;
    });
    builder.addCase(
      fetchUpdateUserApi.fulfilled,
      (state, action: PayloadAction<TUserResponse>) => {
        state.isAuthenticated = true;
        state.updateIsLoading = false;
        state.user = action.payload.user;
        window.location.replace('/profile');
      }
    );
    // регистрация пользователя
    builder.addCase(fetchRegisterUserApi.pending, (state: UserListState) => {
      state.registrationIsLoading = true;
    });
    builder.addCase(
      fetchRegisterUserApi.fulfilled,
      (state, action: PayloadAction<TUserResponse>) => {
        state.isAuthenticated = true;
        state.registrationIsLoading = false;
        state.user = action.payload.user;
        window.location.replace('/');
      }
    );
    // вход пользователя в систему
    builder.addCase(fetchLoginUserApi.pending, (state: UserListState) => {
      state.loginIsLoading = true;
    });
    builder.addCase(fetchLoginUserApi.fulfilled, (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      setCookie('accessToken', action.payload.accessToken);

      state.user = action.payload.user;
      state.loginIsLoading = false;
      state.isAuthenticated = true;
    });
  },
  selectors: {
    selectIsAuthenticated: (sliceState) => sliceState.isAuthenticated,
    selectUserData: (sliceState) => sliceState.user,
    selectUserIsLoading: (sliceState) => sliceState.userIsLoading
  }
});

export const { selectUserData, selectUserIsLoading, selectIsAuthenticated } =
  userSlice.selectors;

export default userSlice.reducer;
