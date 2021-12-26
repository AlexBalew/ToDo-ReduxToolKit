import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from '../api/Todolists.api';
import { handleServerNetworkError } from '../utils/error-utils';

import { isLoggedInAC } from './authReducer';

import { zero } from 'Variables/Variables';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isAppInitialized: boolean;
};

export const initializeAppTC = createAsyncThunk(
  'app/initializeApp',
  async (authParams, { dispatch }) => {
    try {
      const res = await authAPI.authMe();
      if (res.data.resultCode === zero) {
        dispatch(isLoggedInAC({ value: true }));
      } else {
        dispatch(isLoggedInAC({ value: false }));
      }
      // dispatch(setAppIsInitializedStatusAC({isAppInitialized: true})) // эта логика уже в соотв. билдере
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  },
);

export const sliceApp = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null,
    isAppInitialized: false,
  } as InitialStateType,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.error;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
    },
    setAppIsInitializedStatusAC(
      state,
      action: PayloadAction<{ isAppInitialized: boolean }>,
    ) {
      // eslint-disable-next-line no-param-reassign
      state.isAppInitialized = action.payload.isAppInitialized;
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeAppTC.fulfilled, state => {
      // eslint-disable-next-line no-param-reassign
      state.isAppInitialized = true;
    });
  },
});

export const { setAppErrorAC, setAppStatusAC } = sliceApp.actions;

// __thunk

/*
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(isLoggedInAC({value: true}))
            } else {
                dispatch(isLoggedInAC({value: false}))
            }
            dispatch(setAppIsInitializedStatusAC({isAppInitialized: true}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
} */
