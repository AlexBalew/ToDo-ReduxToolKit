import {authAPI, LoginParamsType} from "../api/Todolists.api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "./app-reducer";
import {clearTodoReduxAC} from "./todolist-reducer";

const initialState = {
    isLoggedIn: false
}

export const sliceAuth = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        isLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const {isLoggedInAC} = sliceAuth.actions

//__thunks

export const authTC = (authParams: LoginParamsType) => (dispatch: Dispatch) => {
    debugger
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
}

export const logOutTC = () => (dispatch: Dispatch) => {
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


