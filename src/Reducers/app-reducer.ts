import {Dispatch} from "redux";
import {authAPI} from "../api/Todolists.api";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isLoggedInAC} from "./authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isAppInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isAppInitialized: false,
}

export const sliceApp = createSlice({
    name: 'app',
    initialState: initialState,
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
    }
})

export const {
    setAppErrorAC,
    setAppStatusAC,
    setAppIsInitializedStatusAC
} = sliceApp.actions


//__thunk

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
}