import {authAPI} from "../api/Todolists.api";
import {handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isLoggedInAC} from "./authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isAppInitialized: boolean
}

export const initializeAppTC = createAsyncThunk(
    'app/initializeApp',
    async (authParams, {dispatch}) => {
        try {
            const res = await authAPI.authMe()
            if (res.data.resultCode === 0) {
                dispatch(isLoggedInAC({value: true}))
            } else {
                dispatch(isLoggedInAC({value: false}))
            }
            //dispatch(setAppIsInitializedStatusAC({isAppInitialized: true})) // эта логика уже в соотв. билдере
        } catch(error: any) {
                handleServerNetworkError(error, dispatch)
            }
    })


export const sliceApp = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isAppInitialized: false,
    } as InitialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppIsInitializedStatusAC(state, action: PayloadAction<{ isAppInitialized: boolean }>) {
            state.isAppInitialized = action.payload.isAppInitialized
        }
    },
    extraReducers:builder =>  {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isAppInitialized = true
        })
    }
})

export const {
    setAppErrorAC,
    setAppStatusAC,
} = sliceApp.actions


//__thunk

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
}*/
