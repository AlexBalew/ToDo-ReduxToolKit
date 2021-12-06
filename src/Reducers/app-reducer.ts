import {Dispatch} from "redux";
import {authAPI} from "../api/Todolists.api";
import {isLoggedInAC} from "./authReducer";
import {handleServerNetworkError} from "../utils/error-utils";

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

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            let a = {...state, error: action.error}
            return a
        case 'APP/SET_IS_INITIALIZED_STATUS':
            return {...state, isAppInitialized: action.isAppInitialized}
        default:
            return {...state}
    }
}

export type ActionsType = setAppStatusACType | setAPPErrorACType | setAppIsInitializedStatusACType

export type setAPPErrorACType = ReturnType<typeof setAppErrorAC>

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET_ERROR',
        error
    } as const
}

export type setAppStatusACType = ReturnType<typeof setAppStatusAC>

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET_STATUS',
        status
    } as const
}

export type setAppIsInitializedStatusACType = ReturnType<typeof setAppIsInitializedStatusAC>

export const setAppIsInitializedStatusAC = (isAppInitialized: boolean) => {
    return {
        type: 'APP/SET_IS_INITIALIZED_STATUS',
        isAppInitialized
    } as const
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(isLoggedInAC({value: true}))
            } else {
                dispatch(isLoggedInAC({value: false}))
            }
            dispatch(setAppIsInitializedStatusAC(true))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}