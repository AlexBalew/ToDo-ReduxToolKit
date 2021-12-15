import {authAPI, FieldErrorType, LoginParamsType} from "../api/Todolists.api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "./app-reducer";


export const authTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>(
    'auth/login',
    async (authParams, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await authAPI.login(authParams)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {isLoggedIn: true}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({
                    errors: res.data.messages,
                    fieldsErrors: res.data.fieldsErrors
                })
            }
        } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({
                errors: [error.message],
                fieldsErrors: undefined
            })
        }
    })

export const logOutTC = createAsyncThunk(
    'auth/logOut',
    async (authParams, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await authAPI.logOut()
            if (res.data.resultCode === 0) {
                //thunkAPI.dispatch(clearTodoReduxAC())
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
        }
    })


export const sliceAuth = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        isLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(authTC.fulfilled, (state) => {
            /* if (action.payload) {
                 state.isLoggedIn = action.payload.isLoggedIn
             }*/
            state.isLoggedIn = true
        })
        builder.addCase(logOutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export const {isLoggedInAC} = sliceAuth.actions

//__thunks

/*export const authTC = (authParams: LoginParamsType) => (dispatch: Dispatch) => {
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
}*/

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


