import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI, FieldErrorType, LoginParamsType } from '../api/Todolists.api';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';

import { setAppStatusAC } from './app-reducer';

import { zero } from 'Variables/Variables';

export const authTC = createAsyncThunk<
  { isLoggedIn: boolean },
  LoginParamsType,
  { rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> } }
>('auth/login', async (authParams, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
  try {
    const res = await authAPI.login(authParams);
    if (res.data.resultCode === zero) {
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
      return { isLoggedIn: true };
    }
    handleServerAppError(res.data, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({
      errors: res.data.messages,
      fieldsErrors: res.data.fieldsErrors,
    });
  } catch (error: any) {
    handleServerNetworkError(error, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({
      errors: [error.message],
      fieldsErrors: undefined,
    });
  }
});

export const logOutTC = createAsyncThunk('auth/logOut', async (authParams, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
  try {
    const res = await authAPI.logOut();
    if (res.data.resultCode === zero) {
      // thunkAPI.dispatch(clearTodoReduxAC())
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
      return;
    }
    handleServerAppError(res.data, thunkAPI.dispatch);
    // eslint-disable-next-line consistent-return
    return thunkAPI.rejectWithValue('');
  } catch (error: any) {
    handleServerNetworkError(error, thunkAPI.dispatch);
    // eslint-disable-next-line consistent-return
    return thunkAPI.rejectWithValue('');
  }
});

export const sliceAuth = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    isLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder.addCase(authTC.fulfilled, state => {
      /* if (action.payload) {
                 state.isLoggedIn = action.payload.isLoggedIn
             } */
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = true;
    });
    builder.addCase(logOutTC.fulfilled, state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = false;
    });
  },
});

export const { isLoggedInAC } = sliceAuth.actions;

// __thunks

/* export const authTC = (authParams: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(authParams)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(isLoggedInAC({value: true}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
} */

/*
export const logOutTC_ = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logOut()
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(clearTodoReduxAC())
                    dispatch(isLoggedInAC({value: false}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
*/
